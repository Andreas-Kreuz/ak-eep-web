<p align="center">
  <!--a href="http://andreas-kreuz.github.io/ak-lua-bibliothek-fuer-eep"-->
    <img src="assets/avatar-andreas-kreuz-128.png" alt="" width=72 height=72>
  <!--/a-->

  <h3 align="center">EEP-Web</h3>

  <p align="center">
    Eine Web-Applikation für EEP.
    <br>
    <!--a href="http://andreas-kreuz.github.io/ak-lua-bibliothek-fuer-eep"><strong>Anleitungen und Dokumentation</strong></a-->
  </p>
</p>

<br>

<hr>

# Überblick

EEP-Web ist eine Web-Anwendung. Die Anwendung ist für das Anzeigen von Daten aus EEP gedacht.

Die Daten für diese Anwendung werden durch das Projekt **Lua-Bibliothek für EEP** bereitgestellt.

# Voraussetzung

Installiere die aktuelle Version der **Lua-Bibliothek für EEP** ([Anleitung](http://andreas-kreuz.github.io/ak-lua-bibliothek-fuer-eep))

# Installation von EEP-Web

_**Hinweis**:_ _EEP-Web wird vorläufig nur im Entwicklungsmodus betrieben. Aus diesem Grund sind für die Installation derzeit die Werkzeuge für die Entwicklung einer Angular-App notwendig._

1) Lade und installiere die LTS-Version von NodeJS herunter:
   https://nodejs.org/de/

2) Installiere die notwendigen Pakete für Angular mit der Kommandozeile

   `npm install -g @angular/cli`

3) Lade die aktuelle Version von EEP-Web herunter

    `git clone ...`

4) Installiere den Webserver

   `npm install --save json-server`

5) Starte den JSON-Server mit der JSON-Ausgabedatei der **Lua-Bibliothek für EEP**

   `json-server --watch --host 0.0.0.0 <DATEI>.json`

6) Starte die Web-Anwendung im Entwicklungsmodus

   `ng serve` um den Server zu starten.

   Navigiere zu `http://localhost:4200/`. EEP-Web wird geladen.
