<?xml version="1.0" encoding="UTF-8"?>
<OfficeApp xmlns="http://schemas.microsoft.com/office/appforoffice/1.1"
           xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
           xsi:type="ContentApp">

  <Id>a6515a3c-f724-4329-958c-11c475696a7f</Id>
  <Version>1.3.0.0</Version>
  <ProviderName>David Winderlich</ProviderName>
  <DefaultLocale>en-US</DefaultLocale>

  <DisplayName DefaultValue="PowerPoint Website Viewer"/>
  <Description DefaultValue="Zeigt Webseiten und HTML-Simulationen direkt in PowerPoint-Folien an."/>

  <IconUrl DefaultValue="https://david-winderlich.github.io/powerpointwebviewer/icon.png"/>
  <SupportUrl DefaultValue="https://david-winderlich.github.io/powerpointwebviewer/"/>

  <Hosts>
    <Host Name="Presentation"/>
  </Hosts>

  <DefaultSettings>
    <SourceLocation DefaultValue="https://david-winderlich.github.io/powerpointwebviewer/viewer.html"/>
  </DefaultSettings>

  <Permissions>ReadWriteDocument</Permissions>
</OfficeApp>
