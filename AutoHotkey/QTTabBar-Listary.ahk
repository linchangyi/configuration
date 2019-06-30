strFilePath = %1%
if (ErrorCode := ShellExecute(strFilePath)) <= 32
    msgbox % ErrorCode

ShellExecute(strFilePath, strArgs="", nShowCmd=1) {
    ;http://msdn.microsoft.com/en-us/library/windows/desktop/bb762153%28v=vs.85%29.aspx
    HINSTANCE := DllCall(A_IsUnicode ? "shell32\ShellExecuteW" : "shell32\ShellExecuteA"
       , ptr ? ptr : "uint", 0
       , "uint", 0
       , "str", strFilePath
       , "str", strArgs  ; arguments
       , "uint", 0
       , "int", nShowCmd    ; specifies how an application is to be displayed when it is opened
       , ptr ? ptr : "uint" )
    Return HINSTANCE
}