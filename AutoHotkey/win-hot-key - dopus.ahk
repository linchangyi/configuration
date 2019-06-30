#NoEnv  ; Recommended for performance and compatibility with future AutoHotkey releases.  
SendMode Input  ; Recommended for new scripts due to its superior speed and reliability.  
SetWorkingDir %A_ScriptDir%  ; Ensures a consistent starting directory.  
  
^[::Send {Esc} 

^!k::Send {Up} 
^!j::Send {Down} 
^!h::Send {Left} 
^!l::Send {Right} 


; 双击Shift打开dopus
~Shift::  
	if (A_PriorHotkey <> "~Shift" or A_TimeSincePriorHotkey > 400)  
	{  
		; Too much time between presses, so this isn't a double-press.  
		KeyWait, Shift  
		return  
	}
	if WinExist("ahk_class dopus.lister")
		WinActivate  ; Uses the last found window.	
	else
		Run, C:\Program Files (Green)\Directory Opus\Directory Opus\dopusrt.exe /acmd Go /desktop NEWTAB=findexisting TOFRONT
	return    


