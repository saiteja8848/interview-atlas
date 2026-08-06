param(
  [int]$StartAt = 0,
  [int]$BatchSize = 100
)

$contentFiles = @(
  'content/problem-content-a.ts',
  'content/problem-content-b.ts',
  'content/problem-content-c.ts',
  'content/problem-content-d.ts',
  'content/problem-content-e.ts',
  'content/problem-content-f.ts',
  'content/problem-content-g.ts',
  'content/problem-content-h.ts'
)
$rawTemplateFiles = @('content/problem-content-c.ts', 'content/problem-content-e.ts')
$codePattern = [regex]'(?s)(?:code)?`((?:public\s+)?class\s+.*?)`'
$blocks = New-Object System.Collections.Generic.List[object]

foreach ($contentFile in $contentFiles) {
  $blockIndex = 0
  foreach ($match in $codePattern.Matches((Get-Content $contentFile -Raw))) {
    $javaCode = $match.Groups[1].Value
    if ($rawTemplateFiles -notcontains $contentFile) {
      $javaCode = $javaCode.Replace('\\', '\')
    }
    $blocks.Add([pscustomobject]@{ File = $contentFile; Index = $blockIndex; Code = $javaCode })
    $blockIndex++
  }
}

if ($blocks.Count -ne 600) {
  throw "Expected 600 Java solutions, found $($blocks.Count)."
}

$validationRoot = Join-Path ([System.IO.Path]::GetTempPath()) ("algocraft-java-batch-" + [guid]::NewGuid().ToString('N'))
New-Item -ItemType Directory -Path $validationRoot | Out-Null
$utf8WithoutBom = New-Object System.Text.UTF8Encoding($false)
$listNodeStub = 'class ListNode { int val; ListNode next; ListNode() {} ListNode(int val) { this.val = val; } ListNode(int val, ListNode next) { this.val = val; this.next = next; } }'
$treeNodeStub = 'class TreeNode { int val; TreeNode left; TreeNode right; TreeNode() {} TreeNode(int val) { this.val = val; } TreeNode(int val, TreeNode left, TreeNode right) { this.val = val; this.left = left; this.right = right; } }'
$nodeStub = 'class Node { int val; Node next; Node random; Node prev; Node child; java.util.List<Node> neighbors = new java.util.ArrayList<>(); Node() {} Node(int val) { this.val = val; } Node(int val, java.util.List<Node> neighbors) { this.val = val; this.neighbors = neighbors; } }'
$mountainStub = 'interface MountainArray { int get(int index); int length(); }'
$nestedStub = 'interface NestedInteger { boolean isInteger(); Integer getInteger(); java.util.List<NestedInteger> getList(); }'
$intervalStub = 'class Interval { int start; int end; Interval() {} Interval(int start, int end) { this.start = start; this.end = end; } }'

try {
  $javaFiles = New-Object System.Collections.Generic.List[string]
  for ($globalIndex = 0; $globalIndex -lt $blocks.Count; $globalIndex++) {
    $block = $blocks[$globalIndex]
    $javaCode = $block.Code
    $nameMatch = [regex]::Match($javaCode, '(?:public\s+)?class\s+(\w+)')
    if (-not $nameMatch.Success) {
      throw "Could not determine class name for $($block.File) block $($block.Index)."
    }
    $className = $nameMatch.Groups[1].Value
    $prefix = "package case$globalIndex;`nimport java.util.*;`nimport java.math.*;`n"
    if ($javaCode -match '\bListNode\b' -and $javaCode -notmatch 'class\s+ListNode\b') { $prefix += $listNodeStub + "`n" }
    if ($javaCode -match '\bTreeNode\b' -and $javaCode -notmatch 'class\s+TreeNode\b') { $prefix += $treeNodeStub + "`n" }
    if ($javaCode -match '\bNode\b' -and $javaCode -notmatch 'class\s+Node\b') { $prefix += $nodeStub + "`n" }
    if ($javaCode -match '\bMountainArray\b' -and $javaCode -notmatch 'interface\s+MountainArray\b') { $prefix += $mountainStub + "`n" }
    if ($javaCode -match '\bNestedInteger\b' -and $javaCode -notmatch 'interface\s+NestedInteger\b') { $prefix += $nestedStub + "`n" }
    if ($javaCode -match '\bInterval\b' -and $javaCode -notmatch 'class\s+Interval\b') { $prefix += $intervalStub + "`n" }
    $caseDirectory = Join-Path $validationRoot ("case$globalIndex")
    New-Item -ItemType Directory -Path $caseDirectory | Out-Null
    $javaPath = Join-Path $caseDirectory ("$className.java")
    [System.IO.File]::WriteAllText($javaPath, $prefix + $javaCode, $utf8WithoutBom)
    $javaFiles.Add($javaPath)
  }

  for ($batchStart = $StartAt; $batchStart -lt $javaFiles.Count; $batchStart += $BatchSize) {
    $batchEnd = [Math]::Min($batchStart + $BatchSize - 1, $javaFiles.Count - 1)
    $batch = $javaFiles[$batchStart..$batchEnd]
    $compilerOutput = & javac -d $validationRoot $batch 2>&1
    if ($LASTEXITCODE -ne 0) {
      throw "Compilation failed in batch $batchStart-${batchEnd}:`n$compilerOutput"
    }
    Write-Output "Compiled runtime Java solutions $($batchStart + 1)-$($batchEnd + 1) of $($javaFiles.Count)."
  }
  Write-Output "Compiled all requested runtime Java solutions successfully."
} finally {
  $resolvedValidationRoot = [System.IO.Path]::GetFullPath($validationRoot)
  $resolvedTempRoot = [System.IO.Path]::GetFullPath([System.IO.Path]::GetTempPath())
  if ($resolvedValidationRoot.StartsWith($resolvedTempRoot, [System.StringComparison]::OrdinalIgnoreCase)) {
    Remove-Item -LiteralPath $resolvedValidationRoot -Recurse -Force
  }
}
