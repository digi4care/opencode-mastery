# AI Agent Memory Architecture

## Het Probleem: Stateless LLMs

Out of the box hebben AI agents geen memory. Elke conversatie start met een lege lei. De meeste mensen denken dat je een vector database, complexe retrieval pipelines, of gespecialiseerde memory systemen nodig hebt. Maar OpenCode lost dit op met markdown files en vier mechanismen die op de juiste momenten in een conversatie afvuren.

AI modellen zijn inherent stateless. Er is geen memory tussen calls. Je conversatie is een steeds langer wordende context window die elke beurt opnieuw wordt meegestuurd. Daarom start elke nieuwe conversatie zonder context van de vorige, tenzij je een memory systeem hebt.

## Memory Systemen: Session vs Long-term

Memory systemen kunnen worden opgesplitst in twee onderdelen: **session memory** en **long-term memory**.

### Session Memory

De session is de geschiedenis van een enkele conversatie met een LLM. Tijdens de conversatie moet deze state ergens worden opgeslagen. Deze conversatiegeschiedenis moet bij elke volgende call naar de LLM worden meegestuurd zodat deze de context begrijpt.

Er is echter een probleem: LLMs hebben een eindige context window. Als je de limiet nadert, treedt een proces in werking dat **compaction** heemt. Compaction is het samenvatten van de conversatiegeschiedenis tot de belangrijkste relevante informatie, zodat de conversatie kan doorgaan zonder alle details te verliezen.

### Compaction Strategies

Er zijn drie verschillende strategieën voor het triggeren van compaction:

1. **Count-based** - Compact als de conversatie een bepaalde token size of turn count overschrijdt
2. **Time-based** - Getriggerd wanneer de gebruiker stopt met interacteren voor een bepaalde periode; compaction vindt op de achtergrond plaats
3. **Event-based (semantic)** - De agent triggert compaction wanneer het detecteert dat een taak of topic is afgerond. Dit is de meest intelligente maar ook moeilijkste vorm om accuraat te implementeren

### Long-term Memory

Vanwege de context window limiet kunnen we niet simpelweg volledige oude conversaties in een nieuwe conversatie meesturen. Hier komt long-term memory in beeld. Dit is wat overleeft aan het einde van een sessie.

Denk aan een sessie als een rommelig bureau voor je huidige project. Je hebt verschillende notities en documenten verspreid over je bureau. Daarnaast heb je een archiefkast waar dingen worden gecategoriseerd en opgeslagen. Dat archief is je long-term memory.

## Drie Types Memory

Google publiceerde in november 2025 een white paper getiteld "Context Engineering: Sessions and Memory". Hierin wordt agent memory opgedeeld in drie types:

| Type           | Beschrijving                                                            | OpenCode Implementatie        |
| -------------- | ----------------------------------------------------------------------- | ----------------------------- |
| **Episodic**   | Wat gebeurde er in onze laatste conversatie? Events en interacties      | Daily logs, session snapshots |
| **Semantic**   | Pure feiten of user preferences - wat weet de LLM over jou of het topic | `MEMORY.md`, context files    |
| **Procedural** | Workflows en geleerde routines - hoe voer ik deze taak uit?             | Skills, commands              |

## Effectieve Memory Extractie

Voor een effectief memory systeem moet het:

1. **Begrijpen wat het waard is om te onthouden** - Niet elk detail is belangrijk. Gerichte filtering is nodig, net zoals mensen zich key concepts herinneren in plaats van volledige details.

2. **Items kunnen consolideren** - Als een gebruiker in één conversatie zegt "ik prefereer dark mode", later "ik vind dark mode niet meer leuk", en nog later "ik ben overgestapt naar dark mode", moeten deze drie entries worden samengevoegd tot één: "Gebruiker prefereert dark mode."

3. **Eerdere beslissingen kunnen overschrijven** - Iets dat vandaag waar is, kan morgen onwaar zijn. Het memory systeem moet kunnen differentiëren en updaten. Zonder dit wordt de memory ruis en contradictorisch.

De extractie en consolidatie worden typisch afgehandeld door een andere LLM instantie die een conversatie analyseert.

## Memory Storage

Er zijn verschillende manieren om memory op te slaan, van simpele oplossingen zoals markdown files voor een lokale agent tot gespecialiseerde databases zoals vector storage die kan worden doorzocht voor relevante data.

## OpenCode Memory Implementatie

OpenCode's memory model is een goed voorbeeld van agent memory in de praktijk. Het bestaat uit drie kerncomponenten:

### 1. MEMORY.md (Semantic Memory)

Dit is de semantic memory store voor OpenCode. Het bevat:

- Stabiele feiten
- Preferences
- Informatie over je identiteit

Dit wordt in elke prompt geladen en heeft een aanbevolen limiet van ongeveer 200 regels. De memory is opgesplitst in gestructureerde secties.

### 2. Daily Logs (Episodic Memory)

Daily logs zijn één van OpenCode's implementaties van episodic memory. Het bevat recente context georganiseerd per dag. Deze memory files zijn **append-only** - nieuwe entries worden toegevoegd maar niets wordt verwijderd.

### 3. Session Snapshots (Episodic Memory)

Session snapshots worden getriggerd door een plugin die afvuurt wanneer een nieuwe sessie wordt gestart via de `/new` of `/reset` command. De snapshot:

- Vangt de laatste 15 betekenisvolle berichten uit je conversatie
- Filtert naar alleen user en assistant berichten (tool calls, system messages en slash commands worden uitgesloten)
- Is geen gegenereerde samenvatting, maar de ruwe conversatietekst
- Wordt opgeslagen als markdown file met een beschrijvende naam

## Vier Mechanismen

Op de kern is OpenCode memory gewoon markdown files. Maar deze files zijn maar de helft van het verhaal. Zonder mechanismen die ze op de juiste momenten lezen en schrijven, zitten ze daar niets te doen. De files zijn het archief; de mechanismen verplaatsen dingen van het bureau naar het archief.

### 1. Bootstrap Loading (Session Start)

Bij elke nieuwe conversatie wordt `MEMORY.md` automatisch in de prompt geïnjecteerd. De agent heeft het altijd beschikbaar. Daarnaast instrueren de agent's instructies het om de daily logs van vandaag en gisteren te lezen voor recente context.

- `MEMORY.md` wordt door het systeem geïnjecteerd
- Daily logs worden door de agent zelf geladen volgens eigen instructies

Dit is het simpelste en belangrijkste pattern.

### 2. Pre-Compaction Flush

OpenCode hanteert een count-based benadering voor compaction. Wanneer een sessie de context window limiet nadert, injecteert OpenCode een stille agentic turn die onzichtbaar is voor de gebruiker. Het instrueert de LLM:

> "Je nadert compaction. Sla alles belangrijke op."

Wanneer de agent dit bericht ziet, schrijft het naar de daily log. Dit dient als checkpoint voor de conversatie. Hiermee wordt een destructieve operatie (context verliezen) omgezet in een checkpoint. Het volgt een common database pattern: **write-ahead log** - memory opslaan voordat het verloren gaat.

### 3. Session Snapshot

Session snapshots worden opgeslagen wanneer een nieuwe sessie wordt gestart via `/new` of `/reset`. Een plugin:

- Pakt het laatste stuk van je vorige conversatie
- Filtert naar betekenisvolle berichten
- Genereert een beschrijvende slug voor de bestandsnaam

Het is geen samenvatting, maar een snapshot van waar je over praatte, opgeslagen voordat de lei wordt gewist.

### 4. User Request

De eenvoudigste: de gebruiker vraagt erom. Als een gebruiker zegt "onthou dit", bepaalt de agent of het thuishoort in:

- Semantic memory (`MEMORY.md`), of
- Episodic memory (daily log)

Geen speciale plugin nodig. De agent heeft file writing capabilities en de instructies vertellen hoe de informatie moet worden gerouteerd.

## Conclusie

OpenCode's volledige memory systeem komt neer op:

- **Markdown files** die op de juiste momenten worden geschreven
- **Semantic memory** in `MEMORY.md`
- **Episodic memory** in daily logs en session snapshots
- **Vier mechanismen** die afvuren op de juiste momenten in de conversatie lifecycle

Je hebt geen complexe setup nodig om een agent memory te geven. Je hebt alleen duidelijke instructies nodig voor drie vragen:

1. **What's worth remembering?** - Wat is het waard om te onthouden?
2. **Where does it go?** - Waar moet het opgeslagen worden?
3. **When does it get written?** - Wanneer wordt het weggeschreven?
