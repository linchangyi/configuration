#NoEnv  ; Recommended for performance and compatibility with future AutoHotkey releases.
; #Warn  ; Enable warnings to assist with detecting common errors.
SendMode Input  ; Recommended for new scripts due to its superior speed and reliability.
SetWorkingDir %A_ScriptDir%  ; Ensures a consistent starting directory.

;打开文件夹时，判断是否已经在资源管理器打开，是则定位到该文件夹窗口

if A_Args.Length()>0
{
	dest := ""
	;文件夹路径可能带空格，被解析为多个参数，%0% 代表参数列表，%A_Index%第N个参数
	Loop, %0%
	{
		dest := dest . %A_Index% . " "
	}
	dest := SubStr(dest, 1, StrLen(dest)-1)
}
else
{
	dest := "快速访问"
}


WinGet, windows, List,ahk_class CabinetWClass
Loop, %windows%
{
    this_id := windows%A_Index%

	ControlGetText, address, ToolbarWindow323, ahk_id %this_id%
	
	address:=StrReplace(address,"地址: ","") 
	
	if address = %dest%
	{
		;找到打开的文件夹，定位到窗口，结束脚本
		WinActivate, ahk_id %this_id%
		return
	}
}


if dest = 快速访问 
{
	Run, explorer.exe
}
else
{	
	Run, explore %dest%
}
	