; You should put this script in the same directory as your executable, or else it might create a new config for the allowed hosts.
; Path to your executable
executablePath := "c:\your\executable\here.exe"

; Run the executable in the background
Run, %executablePath%, , Hide