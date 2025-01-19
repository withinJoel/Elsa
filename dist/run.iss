[Setup]
AppName=Elsa
AppVersion=2.0.6
AppPublisher=Joel Jolly
AppPublisherURL=https://github.com/withinjoel/elsa
AppSupportURL=https://github.com/withinjoel/elsa/issues
AppUpdatesURL=https://github.com/withinjoel/elsa/releases
DefaultDirName={pf}\Elsa
DefaultGroupName=Elsa
OutputDir=Output
OutputBaseFilename=Setup
Compression=lzma2
SolidCompression=yes
SetupIconFile=..\Logo\Elsa.ico

[Files]
Source: "Elsa\*"; DestDir: "{app}"; Flags: recursesubdirs

[Icons]
Name: "{commondesktop}\Elsa"; Filename: "{app}\Elsa.exe"; IconFilename: "{app}\Elsa.exe"
Name: "{group}\Elsa"; Filename: "{app}\Elsa.exe"; IconFilename: "{app}\Elsa.exe"

[Run]
Filename: "{app}\Elsa.exe"; Description: "{cm:LaunchProgram,Elsa}"; Flags: nowait postinstall skipifsilent