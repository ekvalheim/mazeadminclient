# README #

### Hosting ###

* Kjører som Static Web App i Azure (https://portal.azure.com/#@sonatconsulting.onmicrosoft.com/resource/subscriptions/8db703d9-3a2c-49a9-9f7f-48fb8aa55aed/resourceGroups/fagdag-maze-bergen/overview)
* https://icy-coast-07e70d403.6.azurestaticapps.net/

### Deploy ###
For hver push til main, kjøres github action som deployer til Static Web App
* Secret angir token til Static Web App (https://github.com/ekvalheim/mazeadminclient/settings/secrets/actions)
* Bygg prod dist (npm run build-prod)

### Manual ###
* Kjører i dag her: https://icy-coast-07e70d403.6.azurestaticapps.net/
* For å kjøre Konkurranse (mode=play&isAmin=true):
  * https://icy-coast-07e70d403.6.azurestaticapps.net/?mode=play&isAdmin=true
* For å bedre ytelse når vi kjører kontroller mode, har vi fjernet notifikasjon til spillere for hvert flytt.
* For å sende notifikasjon til spiller for hvert flytt for å spille robot mode (notifyPlayer=true):
* https://icy-coast-07e70d403.6.azurestaticapps.net/?mode=play&isAdmin=true&notifyPlayer=true

