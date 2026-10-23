# Kestrian (kestrin)

**An invented language for a fictional country.** Nobody speaks Kestrian. It exists so Kestria demos can show a service in a second language, test layouts with longer strings, and make the language switcher do something. Don't present it as a real language. Real services still need translations made and tested by real speakers. That rule doesn't go away just because this language is made up.

Facts about who speaks Kestrian are in `world.md`. It's the lingua franca, spoken by 88% of people, and the first language of 52%. This file is about the language itself.

## At a glance

| | |
|---|---|
| Name in Kestrian | **kestrin** – the language. **Kesträ** – the country. **kestrani** – a Kestrian person. |
| Script | Latin, with 3 extra letters: `ä`, `ö`, `š` |
| Word order | Subject – verb – object, like English |
| Gender | None. One pronoun, `sa`, for he, she and they. |
| Articles | None |
| Plurals | `-et` after a consonant, `-t` after a vowel. Not used after numbers. |
| Cases | Five suffixes on nouns: of, in, to or for, from, with |
| Verbs | No person endings. Tense is a suffix or a word in front. |
| Typical length | About the same as the English on average. Across the prototype strings, long sentences come out 0.9–1.0 times the English length, and a few up to 1.4 times. Single words and labels are often longer (**tavrakoda**). GovKestria layouts still allow for 30% (`design-system/DESIGN.md`), because Vell and Sora may need it. |

## Sounds and spelling

Kestrian is spelled the way it sounds. Stress always falls on the first syllable.

| Letter | Sounds like | Example |
|---|---|---|
| a | a in *father* | **kalun** (household) |
| e | e in *bed* | **edro** (continue) |
| i | ee in *see* | **ilde** (name) |
| o | o in *more*, short | **orelt** (success) |
| u | oo in *food* | **ul** (person) |
| ä | a in *cat* | **Kesträ** (Kestria) |
| ö | like the German *ö*: say "ay" with rounded lips | **möra** (morning) |
| š | sh in *ship* | **kaš** (now) |
| j | y in *yes* | **jeno** (enough) |
| r | a light tap, as in Spanish *pero* | **tavra** (help) |

The other consonants are as in English: `b d f g h k l m n p s t v`. `c`, `q`, `w`, `x`, `y` and `z` appear only in foreign words and in some old family names. Names like **Haldry** keep the spelling they had in the colonial-era register.

Words are short and mostly open: (consonant) vowel (consonant). A word ends in a vowel, in one of `n l r s t k š`, or in `nd` or `lt`.

## Grammar

### Pronouns

| | Singular | Plural |
|---|---|---|
| 1st | **mi** – I | **me** – we |
| 2nd | **ti** – you | **vi** – you (more than one) |
| 3rd | **sa** – he, she, they | **te** – they |

To make a possessive, add the "of" ending: **min** (my), **tin** (your), **san** (his, her, their), **men** (our), **vin**, **ten**.

**GovKestria uses `ti`,** the everyday "you", never a formal one. That's the "helpful neighbour" voice in `DESIGN.md`, and it's shorter. Because **sa** has no gender, forms never have to guess anyone's gender.

### Nouns

Plural: **ul** → **ulet** (people), **olve** → **olvet** (answers). After a number, the noun stays singular: **sor kalun** (two households).

Case endings go on the end of the noun. After a consonant, add an `e` first.

| Ending | Meaning | Example |
|---|---|---|
| `-n` / `-en` | of | **kalunen tavra** – the household's support |
| `-sa` / `-esa` | in, at | **kalunesa** – in the household |
| `-lo` / `-elo` | to, for | **tilo** – for you |
| `-ta` / `-eta` | from | **valdrata** – from the government |
| `-ve` / `-eve` | with | **KestriaID-ve** – with KestriaID |

Brand names, acronyms and other foreign words take the ending after a hyphen, always in the short form: **KestriaID-ve**, **SPA-n**, **UTK-sa**, **English-sa**. A brand name that ends in a vowel can take the ending directly: **GovKestrian**.

### Verbs

Verbs don't change for the person, so the pronoun always comes first. To the verb stem:

| Form | How | Example (stem **sar-**, get) |
|---|---|---|
| Present | add `-a` | **mi sara** – I get |
| Past | add `-i` | **mi sari** – I got |
| Future | **tul** + present | **mi tul sara** – I will get |
| Command | add `-o` | **Saro!** – Get! |
| Not | **na** before the verb | **mi na sara** – I don't get |
| Never | **nakos** instead of **na** | **me tul nakos liska** – we will never ask for |
| Maybe, probably | **sel** before the verb | **ti sel sara** – you can probably get |
| "Is" | **e**, never changes | **Kesträ e maro** – Kestria is a country |
| Noun from a verb | add `-in` | **lisk-** (ask for) → **liskin** (request, application). **drev-** (pay) → **drevin** (payment). |

Every button is a command, so every button label ends in `-o`: **Edro**, **Ruvo**, **Sarvo**. That makes buttons easy to spot, and easy to read aloud.

### Questions

A question puts **ša** at the end, and changes nothing else: **Ti sara tavra.** (You get help.) → **Ti sara tavra ša?** (Do you get help?)

Question words come first: **kel** (who), **ma** (what), **tos** (where), **nur** (when), **kalt** (how much).

Add `-ka` to a question word to make "some-": **maka** (something), **kelka** (someone), **nurka** (sometime).

To join two things, use **ol** (and) or **vo** (or).

## Numbers

| | | | |
|---|---|---|---|
| 1 **ika** | 2 **sor** | 3 **vel** | 4 **kanta** |
| 5 **pemi** | 6 **hesa** | 7 **sitra** | 8 **orva** |
| 9 **nunei** | 10 **tolo** | 100 **saram** | 1,000 **vešan** |

Larger numbers are built biggest first, with multiples joined on: **pemisaram** (500), **vešan pemisaram** (1,500). So **K 1,500** is read *vešan pemisaram kesta*. Write it as `K 1,500` on screen, as `DESIGN.md` says.

The currency name **kesta** is just the Kestrian word for "money".

## Place names

The English names on the map are mostly colonial-era. Some are translations, and some are Kestrian words in English spelling. Several have meanings:

| On the map | Kestrian | Meaning |
|---|---|---|
| Kestria | **Kesträ** | from *kestra*, "meeting place" – the old market towns where the regions traded |
| Dunmar | **Dunmar** | *dun* (dry) + *mar* (land) – the dry land, capital of the Northern Plains |
| Belmar | **Belmar** | *bel* (shore) + *mar* (land) |
| Kerrow, Lake Kerrow | **Kerro** | *kerro* means "lake", so Lake Kerrow is "lake lake", as many real place names are |
| Tor Vessa | **Tor Vessa** | *tor* (high) + *vessa* (pasture) – the high pastures |
| Aranport | **Aranhavo** | *aran* (old) + *havo* (harbour) – the old harbour |
| Citizen Service Centre | **Ulen Tavrakoda** (UTK) | "the people's help-house" |

Talamir, Orsk and Greywell are Vell names, and Corran Isle and Skerra are Sora names. Kestrian keeps them as they are.

## Glossary for services

The full prototype strings are in `examples/build-household-support-grant/kestrin/strings.json`.

| English | Kestrian | Literally |
|---|---|---|
| Continue | **Edro** | go on |
| Back | **Ruvo** | go back |
| Start now | **Venno kaš** | begin now |
| Yes / No | **Ova** / **Ena** | |
| Send application | **Sarvo liskin** | send the request |
| Check your answers | **Mirvo tin olvet** | look at your answers |
| Change | **Vaino** | change (command) |
| Save and come back later | **Pido ol ruvo nurka** | keep and come back sometime |
| Sign in with KestriaID | **Ido KestriaID-ve** | enter with KestriaID |
| Get help | **Saro tavra** | get help |
| Error: | **Vira:** | mistake |
| Success | **Orelt** | it worked |
| Warning | **Vardo** | watch out |
| Household | **kalun** | |
| Household Support Grant | **Kalunen Tavra** | the household's support |
| Payment, to pay | **drevin**, **drev-** | |
| Who receives the money | **kel sara kesta** | |
| Name | **ilde** | |
| Phone | **fon** | loanword |
| District / region / village | **pradi** / **maran** / **hosta** | |
| Grandmother | **amma** | |
| Fictional | **kuvelta** | made-up |
| Demonstration | **naitos** | showing |
| Government | **valdra** | |
| Hello / Thank you | **Sevra** / **Ollan** | |

### Phrases from the Household Support Grant prototypes

| English | Kestrian |
|---|---|
| Kestria is a fictional country, used for demonstration. | **Kesträ e kuvelta maro, naitoslo.** |
| Apply for the Household Support Grant | **Lisko Kalunen Tavra** |
| Has anything changed in your household? | **Maka vaini tin kalunesa ša?** |
| Who should receive the money? | **Kel tul sara kesta ša?** |
| Your household can probably get the grant. | **Tin kalun sel sara Kalunen Tavra.** |
| We will never ask for your PIN. | **Me tul nakos liska tin PIN.** |
| Visit any Citizen Service Centre. Staff can apply for you. | **Ido ika Ulen Tavrakoda. Ulet sel liska tilo.** |
| Call the GovKestria helpline on +999 77 100 2000. | **Fono GovKestrian tavrafon +999 77 100 2000.** |

**GovKestria stays as it is.** It's a brand, so it isn't translated, and **GovKestrian** is just its "of" form.

## Writing services in Kestrian

- **Allow for longer words.** Sentences come out about as long as the English, but Kestrian builds long nouns by joining words (**tavrakoda**, **Kalunen Tavra**), so buttons, tags and labels can be wider. Don't cut words to fit. Let them wrap.
- **The language switcher names the language in itself:** **Kestrin**, not "Kestrian" (`DESIGN.md`, ServiceHeader). On an English page, the switcher reads **Kestrin**. On a Kestrian page, it reads **English**.
- **Keep English loanwords to the brand names** – KestriaID, PIN, GovKestria – and **fon**, which everyone says.
- **Put numbers before nouns,** and keep the noun singular: **pemi drevin** (five payments).
- **Use the plain-language rules as they are.** Short sentences, `ti`, and commands that start with the verb all come naturally in Kestrian.

## Lexicon

Every root invented for the Household Support Grant prototypes. A stem ending in a hyphen is a verb: add the endings from the Verbs table. Compounds and derived words are in the Notes. The prototypes also use two patterns that follow from the grammar above:

- **Passive:** **e** plus the past form. **Sa e drevi** – it is paid. **Arvel e vaini** – the record was changed.
- **Clauses:** **kedu** joins a clause to a noun or a verb. **Ul kedu sara kesta** – the person who gets the money. **Mi pasvana kedu …** – I confirm that …

| Kestrian | English | Notes |
|---|---|---|
| **akal** | result | Noun |
| **ankal** | year | Noun |
| **anvu** | season | Noun. **neruanvu**, rainy season |
| **aparu** | system | Noun. **drevaparu**, payment system |
| **aran** | old, out of date | Adjective. From the place name Aranhavo. **aranul**, older person; **Aranuleten Tavra**, Older Persons Grant |
| **ardel** | main | Adjective. **Ardel Maran**, Capital Region |
| **arvel** | record; **arvel-**, record, register, note down | Noun and verb. **arvelul**, the registered person; **mirvarvel**, audit log |
| **arvelmo** | register, registry | Noun. **Kesträn Ularvelmo**, National Population Register; **Kesträn Tavrarvelmo**, National Social Registry; **Sinduarvelmo**, Civil Registry |
| **aštel-** | set, configure | Verb. **aštelin**, configuration |
| **bel** | shore | Noun. From the place name Belmar. **Belen Hanto**, Coastal South |
| **brena** | letter (in the post) | Noun |
| **dalkan-** | cancel | Verb |
| **dalura** | data, details, information | Noun |
| **dalvar-** | prepare, get ready | Verb |
| **dase** | but | Conjunction |
| **dašu** | like, such as, for example, as | Preposition |
| **derkan-** | know, recognise | Verb |
| **dervel-** | choose, select | Verb. **dervelin**, choice |
| **dimo** | because | Conjunction |
| **doka** | after, then, later | Adverb and preposition |
| **dokel** | jetty | Noun |
| **dolu** | vote | Noun. **dolulaspa**, voter card |
| **dorel** | policy | Noun |
| **doru** | many | Adjective. **dorvuno**, often |
| **dovel-** | have | Verb |
| **dulmar-** | say, tell, report | Verb. **dulmarin**, statement |
| **dulpa** | fault | Noun |
| **dumba** | tank | Noun. **hevdumba**, water tank |
| **dun** | dry | Adjective. From the place name Dunmar |
| **durel** | level, band | Noun |
| **durva** | session | Noun |
| **duvor-** | act for someone | Verb. **duvorul**, the person acting for someone |
| **elnu** | age | Noun |
| **ensa** | there | Adverb |
| **ersel** | available | Adjective |
| **eš** | this, these | Determiner. **eš pävo**, today |
| **fena** | part, section, branch | Noun. **valdrafena**, department |
| **fendal** | account (bank, wallet or user) | Noun. **drevfendal**, payout account |
| **fenu** | before, earlier | Adverb and preposition. **fenudrevin**, back pay |
| **folva** | slip, sheet | Noun. **pirutfolva**, service sheet |
| **hanto** | south | Noun. **Belen Hanto**, Coastal South |
| **hanu** | friend | Noun |
| **haru** | too (more than is right) | Adverb |
| **haskel-** | try | Verb |
| **hemal** | husband or wife | Noun |
| **hendra** | team | Noun |
| **henel** | safe | Adjective |
| **hentu** | reference | Noun |
| **hevu** | water | Noun. **hevtosel**, water point; **hevrok**, well |
| **himpa** | cash | Noun. **himpalapra**, cash voucher |
| **hiro** | fish | Noun. **hirokestra**, fish market |
| **hokel** | box (on a form) | Noun |
| **honel-** | agree | Verb. **honelin**, consent |
| **hölt** | sorry | Adjective |
| **huna** | here | Adverb |
| **hunu** | low | Adjective. **hunusa**, below |
| **hurel** | north | Noun. **Hurelen Tasmaret**, Northern Plains |
| **hurkan-** | refuse, decline | Verb. **hurkanin**, refusal |
| **hurvan-** | need, have to; take (time) | Verb |
| **huvo** | format, type, kind | Noun |
| **ildar-** | name (someone) | Verb. From **ilde** |
| **ilt** | last, latest | Adjective |
| **ilvar-** | contact | Verb. **ilvarin**, contact |
| **imar-** | understand | Verb. **imarkoda**, school |
| **inkrel-** | print | Verb |
| **irka** | photo | Noun |
| **irvel** | if, whether | Conjunction |
| **isu** | in (moving in) | Adverb |
| **jalt** | step | Noun |
| **jemi** | food | Noun |
| **jendo** | order, sequence | Noun |
| **jirvan-** | want, like | Verb |
| **jondin** | assumption | Noun |
| **jundar-** | visit (come to see) | Verb. **jundarin**, visit |
| **jurman-** | promise | Verb. **jurmanin**, promise |
| **kaltin** | amount, balance | Noun. From **kalt** |
| **kaltka** | some | Determiner. **kalt** + **-ka** |
| **kanra** | vehicle | Noun |
| **kedu** | that, who, which (joins clauses) | Conjunction |
| **kelin** | identity | Noun. From **kel**, who |
| **kelvar-** | collect, pick up | Verb |
| **kemar** | provider | Noun |
| **kenda** | private | Adjective. **kendel**, privacy |
| **kenu** | central | Adjective. **Aranhavo Kenu**, Aranport Central |
| **kervan-** | look up, search | Verb. **kervanin**, lookup |
| **kesel** | cycle | Noun. **drevkesel**, payment cycle |
| **kesmun** | disability | Noun |
| **kestra** | town, market | Noun. From the place-name note on **Kesträ** |
| **keša** | still, yet | Adverb |
| **kevran-** | stay, last | Verb |
| **kimal** | test | Noun |
| **kodvel-** | live (somewhere) | Verb. From **koda** |
| **kordan-** | decide | Verb. **kordanin**, decision |
| **kotal** | normal, usual, common | Adjective. **kotalve**, usually |
| **kudel** | network | Noun. **kudelesa**, online |
| **lamo** | fine, good, all right | Adjective |
| **lapra** | voucher | Noun |
| **laspa** | card | Noun. **kelinlaspa**, ID card |
| **lavi** | message | Noun. **fonlavi**, text message; **fonlav-**, send a text; **lavikoda**, post office |
| **lendo** | area, yard | Noun. **pirdalendo**, boatyard |
| **lepa** | child, son or daughter | Noun. **sorlepa**, grandchild |
| **lertan-** | add | Verb |
| **lindu** | sure | Adjective. **lindel**, assurance |
| **lombel-** | move (home) | Verb. **lombelin**, a move |
| **lomel** | at least | Adverb |
| **lonu** | far, away | Adverb |
| **lurdan-** | happen | Verb |
| **mar** | land | Noun. From the place names Dunmar and Belmar |
| **masil** | device | Noun. **pinumasil**, fingerprint reader |
| **mašel** | worn | Adjective |
| **mälu** | prototype | Noun |
| **melbu** | cattle | Noun. **melbul**, pastoralist |
| **mendar-** | think | Verb |
| **mevar-** | bring, take | Verb |
| **midu** | between | Preposition |
| **mimel** | baby | Noun |
| **molu** | word | Noun |
| **naika** | none, no (not any) | Determiner. **na** + **ika** |
| **nait-** | show | Verb. The stem of **naitos** |
| **nakel** | nobody | Pronoun. **na** + **kel** |
| **nama** | nothing | Pronoun. **na** + **ma** |
| **nekor-** | find, work out | Verb |
| **nemu** | island | Noun. **Pelnin Nemut**, Eastern Islands |
| **neru** | rain | Noun |
| **neska** | why | Question word. **neskel**, reason |
| **nesul** | neighbour | Noun |
| **nirka** | about, roughly | Adverb |
| **nol** | how | Question word |
| **nolter-** | write, type, fill in | Verb |
| **noru** | recently | Adverb |
| **nuldar-** | link | Verb. **nuldarin**, link |
| **nupa** | short | Adjective |
| **nusa** | again | Adverb |
| **nusel** | wallet | Noun. **fonkesta**, mobile money |
| **nuvel** | wet | Adjective |
| **olkan-** | run, manage, do, look after | Verb. **olkanin**, process |
| **olku** | first | Adjective |
| **olt** | also | Adverb |
| **olterga** | cooperative | Noun. **ol** + **terga** |
| **olv-** | answer | Verb. From **olve** |
| **ondu** | already | Adverb |
| **orno** | more | Adjective and adverb |
| **orsu** | health | Noun |
| **ortel** | exchange | Noun. **Valdran dalortel**, Government data exchange |
| **oru** | other, another, different, else | Adjective. **orusa**, instead |
| **osal** | agency, authority | Noun. **Ulvarolin Osal**, Social Protection Agency; **Pernelen Osal**, Licensing Authority |
| **parsul** | champion, guide | Noun. **parsin**, guidance; **sifal parsul**, digital champion |
| **pasvan-** | confirm, verify, approve | Verb. **pasvanin**, confirmation, declaration |
| **pävo** | day | Noun. Weekdays count from Monday: **Sorpävo**, Tuesday; **Kantapävo**, Thursday; **Hesapävo**, Saturday. **tergapävo**, working day |
| **pelda** | paper, certificate | Noun. **sindupelda**, birth certificate |
| **pelni** | east | Noun |
| **pelv-** | lose | Verb |
| **pemal** | neutral | Adjective |
| **pend-** | close | Verb |
| **perlo** | survey | Noun |
| **pernel** | licence | Noun |
| **pinu** | finger | Noun. **pinutelt**, fingerprint |
| **pirda** | boat | Noun |
| **pirkel-** | ask (a question) | Verb. **pirkelin**, question |
| **pirut** | service | Noun. **fonpirut**, app |
| **pirvel-** | refer (someone) | Verb |
| **pondul** | researcher | Noun |
| **pors-** | reach | Verb. **porsin**, accessibility |
| **pulmar-** | guess, estimate | Verb |
| **pumel** | list | Noun |
| **pundar-** | finish, stop | Verb |
| **rav-** | speak | Verb. **rava**, voice; **ravave**, out loud |
| **rešta** | law | Noun. **reštave**, compliant |
| **rin** | language | Noun. From **kestrin**. **rinvainin**, translation |
| **riš** | only | Adverb |
| **rodi** | family | Noun. **rodel**, relative; **Rodin ilde**, family name |
| **rudal** | filter | Noun |
| **rumi** | within | Preposition |
| **sanel** | way | Noun. **drevsanel**, payment route |
| **senkar-** | read | Verb |
| **senkel** | desk | Noun |
| **senuva** | week | Noun |
| **seval** | month | Noun. Months count from January: **Ikaseval**, **Sorseval** … **Toloseval**, **Toloikaseval**, **Tolosorseval** |
| **sif-** | count | Verb. From **sifa** |
| **sifa** | number, digit | Noun. **fonsifa**, phone number; **kalunsifa**, household number |
| **sifal** | digital | Adjective. **Kesträn Sifal Pirut**, Kestria Digital Service |
| **simu** | behind | Preposition |
| **sind-** | be born | Verb. **sindu**, birth; **sinduvudo**, date of birth |
| **somel** | near, next to, beside | Preposition |
| **sompa** | basic | Adjective |
| **sondel-** | match | Verb |
| **sonu** | without | Preposition |
| **sornel** | copy | Noun |
| **sulen-** | allow, let | Verb. **sulenin**, permission; **suleni**, authorised, certified |
| **sumbel-** | die | Verb. **sumbelin**, death, loss |
| **sumel** | until; to (in a range) | Preposition |
| **šelt** | own, self | Adjective and pronoun |
| **šird-** | cut off | Verb |
| **tarnel-** | book (a visit) | Verb. **tarnelin**, booking |
| **tasel** | platform | Noun. **Kesträn kelintasel**, National identity platform |
| **tasmar** | plain (flat land) | Noun |
| **telda** | notice | Noun |
| **telt** | mark; **telt-**, tick, mark | Noun and verb |
| **temar-** | use | Verb |
| **tenu** | new | Adjective. **tenvar-**, renew, update; **tenvarin**, update, news |
| **teral** | right, correct, true, real | Adjective. **teral-**, correct (verb) |
| **terg-** | work | Verb. **terga**, work, job |
| **teru** | about | Preposition |
| **tesu** | content | Noun |
| **tevar-** | build, make | Verb |
| **tikal** | minute | Noun |
| **tirsa** | coffee | Noun |
| **tor** | high | Adjective. From the place name Tor Vessa. **Tormar**, Highlands |
| **torvel-** | remind | Verb |
| **tosel** | place | Noun. From **tos**. **kodtosel**, address; **tostelt**, landmark |
| **tovel** | screen | Noun |
| **tromel-** | switch | Verb. **tromelin**, a switch |
| **tumel-** | give | Verb |
| **tumpa** | empty, blank | Adjective |
| **tuva** | all, every, each | Determiner. **tuvavuno**, always |
| **ulmen-** | share | Verb |
| **usu** | out (moving out) | Adverb |
| **uš** | that, those | Determiner |
| **vadu** | road | Noun |
| **vahul** | intermediary | Noun |
| **valk-** | travel | Verb. **valkel**, mobile |
| **varol-** | protect | Verb. **Ulvarolin Osal**, Social Protection Agency |
| **vasul** | adult | Noun |
| **vašu** | less | Adjective |
| **vemi** | blue | Adjective |
| **vemp-** | skip | Verb |
| **vernu** | committee | Noun. **vernul**, committee member |
| **vinu** | code | Noun. **ikavinu**, one-time code |
| **vudo** | date | Noun |
| **vuno** | time | Noun |
| **vurta** | intent | Noun. **vurtave**, on purpose |

## What isn't here

- **No other languages:** Vell and Sora are still undescribed.
- **Real-language clashes:** *vessa* in Tor Vessa is everyday Finnish and Swedish for "toilet". Consider renaming the town before demos in the Nordics. Check any new word against common languages before using it.
- **Small and unchecked:** the dictionary is only what services need, and nobody has checked the grammar for consistency beyond this page. If you add a word, add it to the glossary, and check it doesn't clash with an existing one.
