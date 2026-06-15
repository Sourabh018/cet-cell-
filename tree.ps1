function Get-Tree {
    param(
        [string]$Path = '.',
        [string]$Indent = '',
        [string[]]$Exclude = @('node_modules', 'target', '.git', '.idea', 'dist', '__pycache__')
    )

    $items = Get-ChildItem -Path $Path | Where-Object { $Exclude -notcontains $_.Name }
    $total = $items.Count
    $current = 0

    foreach ($item in $items) {
        $current++
        $isLast = $current -eq $total
        $prefix = if ($isLast) { '\-- ' } else { '|-- ' }
        
        Write-Output "$Indent$prefix$($item.Name)"
        
        if ($item.PSIsContainer) {
            $childIndent = if ($isLast) { "$Indent    " } else { "$Indent|   " }
            Get-Tree -Path $item.FullName -Indent $childIndent -Exclude $Exclude
        }
    }
}

Get-Tree | Out-File -FilePath project_structure.txt -Encoding utf8
