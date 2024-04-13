Snoop Project
=============

## Snoop Project один из самых перспективных OSINT-инструментов по поиску никнеймов.
- [X] This is the most powerful software taking into account the CIS location.

<img src="https://raw.githubusercontent.com/snooppr/snoop/master/images/snoop.png" />

Is your life slideshow? Ask Snoop.  
Snoop project is developed without taking into account the opinions of the NSA and their friends,  
that is, it is available to the average user.  

 • [English readme](https://github.com/snooppr/snoop/blob/master/README.en.md "Please feel free to improve the translation of this page.")  

Snoop — это исследовательская работа (собственная база данных/закрытые багбаунти)  
в области поиска и обработки публичных данных в сети интернет.  
По части специализированного поиска Snoop способен конкурировать с традиционными поисковыми системами.  

Сравнение индексаций БД-никнеймов подобных инструментов:  
<img src="https://img.shields.io/badge/Snoop-~2500+%20websites-success" width="30%" />  
<img src="https://img.shields.io/badge/Sherlock-~350 websites-yellowgreen" width="20%" />  
<img src="https://img.shields.io/badge/Spiderfoot-~350 websites-yellowgreen" width="20%" />  
<img src="https://img.shields.io/badge/Whatsmyname-~300 websites-yellowgreen" width="20%" />  
<img src="https://img.shields.io/badge/Namechk-~100 websites-red" width="15%" />  


| Платформа             | Поддержка |
|-----------------------|:---------:|
| <img src="https://raw.githubusercontent.com/snooppr/snoop/master/icons/Linux.png" width="5%" /> GNU/Linux             |     ✅    |
| <img src="https://raw.githubusercontent.com/snooppr/snoop/master/icons/Windows.png" width="5%" /> Windows 7/10 (32/64)  |     ✅    |
| <img src="https://raw.githubusercontent.com/snooppr/snoop/master/icons/Android.png" width="5%" /> Android (Termux)      |     ✅    |
| <img src="https://raw.githubusercontent.com/snooppr/snoop/master/icons/macOS.png" width="5%" /> macOS                 |     ❗️    |
| <img src="https://raw.githubusercontent.com/snooppr/snoop/master/icons/IOS.png" width="5%" /> IOS                   |     🚫    |
| <img src="https://raw.githubusercontent.com/snooppr/snoop/master/icons/WSL.png" width="5%" /> WSL                   |     🚫    |  


Snoop for OS Windows and GNU/Linux
==================================

**Snoop Local database**  
<img src="https://raw.githubusercontent.com/snooppr/snoop/master/images/snoop_run.png" />  
[Snoop full version database 2500+ websites ⚡️⚡️⚡️](https://github.com/snooppr/snoop/blob/master/websites.md "Database Snoop")  

## Релиз/Release
<img src="https://raw.githubusercontent.com/snooppr/snoop/master/images/snoop box.png" width="35%" />  

snoop.exe (for Windows) and snoop (for GNU/Linux)  
🇷🇺 🇺🇸 [Download Snoop Project](https://github.com/snooppr/snoop/releases "скачать готовую сборку Snoop для Windows и GNU/Linux")  

**RU**: Snoop поставляется готовыми сборками (релиз) и не требует зависимостей (библиотек) или установки python3,
то есть работает на чистой машине с OS Windows или GNU/Linux.  
**EN**: Snoop comes with ready-made assemblies (release) and does not require dependencies (libraries) or python3 installation, that is, it runs on a clean machine with OS Windows or GNU/Linux.  
 
<img src="https://raw.githubusercontent.com/snooppr/snoop/master/images/Run.gif"/>  

<details>
<summary>Snoop Project Plugins</summary>  

## 1. Demonstration of one of the methods in the Plugin — [GEO_IP/domain]  
<img src="https://raw.githubusercontent.com/snooppr/snoop/master/images/GEO_IP.gif" />  

**Reports are also available in csv/txt/CLI/maps**  
<img src="https://raw.githubusercontent.com/snooppr/snoop/master/images/GEO_IPcsv.jpeg" />  

## 2. Demonstration of one of the methods in the Plugin — [Yandex_parser]  
<img src="https://raw.githubusercontent.com/snooppr/snoop/master/images/Yandex_parser.gif" />  

**Search report dozen nickname (Plugin — Yandex_parser)**  
<img src="https://raw.githubusercontent.com/snooppr/snoop/master/images/Yandex_parser 4.png" />  

## 3. Demonstration of one of the methods in the Plugin — [Reverse Vgeocoder]  
<img src="https://raw.githubusercontent.com/snooppr/snoop/master/images/RVG.gif" /> 
</details>

<details>
<summary>Самостоятельная сборка ПО из исходного кода/Self-build software from source</summary>  

**Native Installation**  
Примечание: требуемая версия python 3.7+

```
# Клонировать репозиторий
$ git clone https://github.com/snooppr/snoop

# Войти в рабочий каталог
$ cd ~/snoop

# Установить python3 и python3-pip, если они не установлены
$ apt-get update && apt-get install python3 python3-pip

# Установить зависимости 'requirements'
$ pip install --upgrade pip
$ python3 -m pip install -r requirements.txt
# Либо установить все зависимости из 'requirements.txt' в ручную через
$ pip3 install module1 module2...
# Если вместо флагов стран отображаются спецсимволы, доставить пакет шрифта, например монохромный
$ apt-get install ttf-ancient-fonts или цветной apt-get install fonts-noto-color-emoji
# На OS Windows использовать cmd или powershell (на выбор по удобству), но не WSL!
```
</details>

<details>
<summary>Использование/Using</summary>  

**English version — of Snoop see release (available 'OLD Snoop EN version 1.2.5')**
```
Справка

optional arguments:
  -h, --help            show this help message and exit

service arguments:
  --version, -V         About: вывод на печать версий:: OS; Snoop;
                        Python и Лицензии
  --list-all, -l        Вывести на печать детальную информацию о базе
                        данных Snoop
  --donate, -d          Пожертвовать на развитие Snoop Project-а,
                        получить/приобрести Snoop full version
  --autoclean, -a       Удалить все отчеты, очистить место
  --update, -U          Обновить Snoop

plugins arguments:
  --module, -m          OSINT поиск: задействовать различные плагины
                        Snoop:: IP/GEO/YANDEX (список плагинов будет
                        пополняться)

search arguments:
  nickname              Никнейм разыскиваемого пользователя.
                        Поддерживается поиск одновременно нескольких имён.
                        Ник, содержащий в своем имени пробел, заключается в
                        кавычки
  --verbose, -v         Во время поиска 'nickname' выводить на печать
                        подробную вербализацию
  --base , -b <path>    Указать для поиска 'nickname' другую БД
                        (Локально)/В demo version функция отключена
  --web-base, -w        Подключиться для поиска 'nickname' к
                        обновляемой web_БД (Онлайн)/ В demo version функция
                        отключена
  --site , -s <site_name> 
                        Указать имя сайта из БД '--list-all'. Поиск
                        'nickname' на одном указанном ресурсе, допустимо
                        использовать опцию '-s' несколько раз
  --exclude , -e <country_code> 
                        Исключить из поиска выбранный регион,
                        допустимо использовать опцию '-e' несколько раз,
                        например, '-e RU -e WR' исключить из поиска Россию и
                        Мир
  --one-level , -o <country_code> 
                        Влючить в поиск только выбранный регион,
                        допустимо использовать опцию '-o' несколько раз,
                        например, '-o US -o UA' поиск по США и Украине
  --country-sort, -c    Сортировка 'печать/запись_результатов' по
                        странам, а не по алфавиту
  --time-out , -t <digit> 
                        Установить выделение макс.времени на ожидание
                        ответа от сервера (секунды). Влияет на
                        продолжительность поиска. Влияет на 'Timeout ошибки'.
                        Вкл. эту опцию необходимо при медленном интернет
                        соединении, чтобы избежать длительных зависаний при
                        неполадках в сети (по умолчанию значение выставлено
                        5с)
  --found-print, -f     Выводить на печать только найденные аккаунты
  --no-func, -n         ✓Монохромный терминал, не использовать цвета
                        в url ✓Отключить звук ✓Запретить открытие web
                        browser-а ✓Отключить вывод на печать флагов стран
                        ✓Отключить индикацию и статус прогресса. Экономит
                        ресурсы системы и ускоряет поиск
  --userlist , -u <path> 
                        Указать файл со списком user-ов. Snoop
                        интеллектуально обработает данные и предоставит
                        доп.отчёты. Пример для Linux: 'python3 snoop.py -u
                        ~/users.txt'. Пример для Windows: 'python snoop.py -u
                        c:\User\User\Documents\users.txt'
  --save-page, -S       Сохранять найденные странички пользователей в
                        локальные файлы
  --cert-on, -C         Вкл проверку сертификатов на серверах. По
                        умолчанию проверка сертификатов на серверах отключена,
                        что даёт меньше ошибок и больше результатов при поиске
                        nickname
  --headers , -H <name> 
                        Задать user-agent вручную, агент заключается
                        в кавычки, по умолчанию для каждого сайта задаётся
                        случайный либо переопреденный user-agent из БД snoop.
                        https://юзерагент.рф/
  --normal-mode, -N     Переключатель режимов: SNOOPninja >
                        нормальный режим > SNOOPninja. По_умолчанию (GNU/Linux
                        full version) вкл 'режим SNOOPninja': ускорение поиска
                        ~25pct, экономия ОЗУ ~50pct, повторное 'гибкое'
                        соединение на сбойных ресурсах. Режим SNOOPninja
                        эффективен только для Snoop for GNU/Linux full
                        version. По_умолчанию (в Windows) вкл 'нормальный
                        режим'. В demo version переключатель режимов
                        деактивирован
```  

**Example**
```
# Для поиска только одного пользователя:
$ python3 snoop.py nickname1 #Running from source
$ snoop nickname1 #Running from release
# Или, например, кириллица поддерживается:
$ python3 snoop.py олеся #Running from source
# Для поиска имени, содержащего пробел:
$ snoop "ivan ivanov" #Running from release
$ snoop ivan_ivanov #Running from release
$ snoop ivan-ivanov #Running from release

# Запуск на OS Windows:
$ python snoop.py nickname1 #Running from source
$ snoop.exe nickname1 #Running from release
# Для поиска одного и более юзеров:
$ snoop.exe nickname1 nickname2 nickname123321 #Running from release

# Поиск множества юзеров — сортировка вывода результатов по странам;
# избежание зависаний на сайтах (чаще 'мёртвая зона' зависит от ip-адреса пользователя);
# выводить на печать только найденные аккаунты; сохранять странички найденных
# аккаунтов локально; указать файл со списком разыскиваемых аккаунтов;
# подключиться для поиска к расширяемой и обновляемой web-base Snoop;
# исключить из поиска все сайты в RU-регионе:
$ snoop -с -t 6 -f -S -u ~/file.txt -w -e RU #Running from release

# проверить базу данных Snoop:
$ snoop --list-all #Running from release

# распечатать справку по функциям Snoop:
$ snoop --help #Running from release

# Задействовать плагины Snoop:
$ snoop --module #Running from release
```

**'ctrl + c'** — прервать поиск (остановить корректно ПО в исх.форме).  **'ctrl + \\'** build-version GNU\Linux.
Найденные учетные записи будут храниться в ~/snoop/results/nicknames/*/'nickname'.{txt.csv.html}.  
Для доступа внешнего браузера к результатам поиска на платформе Android желательно иметь рут права.  
csv открывать в *office, разделитель полей **запятая**.  

Уничтожить **все** результаты поиска — удалить каталог '~/snoop/results'.  
или ```snoop.exe --autoclean #Running from release OS Windows```
```
# Обновляйте Snoop для тестирования новых функций в ПО:
$ python3 snoop.py --update #требуется установка Git.
```
</details>  

<details>
<summary>Snoop for Android</summary>  

 • [Для удобства отдельный мануал](https://github.com/snooppr/snoop/tree/snoop_termux "Snoop for Android")  

<p align="center">  
  <img src="https://raw.githubusercontent.com/snooppr/snoop/master/images/Snoop_2android.png" />  
</p>  

search nickname  
<p align="center">  
  <img src="https://raw.githubusercontent.com/snooppr/snoop/master/images/snoopandroid.png" />  
</p>  

plugins  
<img src="https://raw.githubusercontent.com/snooppr/snoop/master/images/Snoop_termux.plugins.png" />  

**Native Installation**  

Установить [Termux](https://f-droid.org/ru/packages/com.termux/ "F-Droid")  
```
# ПРИМЕЧАНИЕ_1!: установка Snoop на Termux продолжительная по времени (минуты).
# ПРИМЕЧАНИЕ_2!: если у пользователя ошибки при $ 'pkg update', например из-за цензуры в стране,
# и/или из-за того, что Termux давно не обновлялся на устройстве пользователя,
# то удаление/установка Termux-приложения не поможет,
# т.к. после удаления старые репозитории остаются на устройстве пользователя, решение:
$ termux-change-repo 
# и выбрать получение обновлений (для всех репо) из другого зеркала-репозитория.

# Войти в домашнюю папку Termux (т.е. просто открыть Termux)
$ termux-setup-storage
$ pwd #/data/data/com.termux/files/home #дефолтный/домашний каталог

# Установить python3 и зависимости
$ apt update && pkg upgrade && pkg install python libcrypt libxml2 libxslt git
$ pip install --upgrade pip

# Клонировать репозиторий
$ git clone https://github.com/snooppr/snoop -b snoop_termux
# (Если флешкa FAT (ни ext4), в таком случае,
# клонировать репозиторий только в домашнюю директорию Termux)

# Войти в рабочий каталог Snoop
$ cd ~/snoop
# Установить зависимости 'requirements'
$ python3 -m pip install -r requirements.txt

# Чтобы расширить вывод терминала в Termux (по умолчанию 2к строк отображение в CLI),
# например, отображение всей БД опции '--list-all [1/2]'  
# добавить строку 'terminal-transcript-rows=10000' в файл '~/.termux/termux.properties'
# (крайне полезная опция доступна в Termux v0.114+). 
# Перезапустить Termux.  

# Пользователь также может запустить snoop по команде 'snoop' из любого места в CLI, создав alias.
$ cd && printf "alias snoop='cd && cd snoop && python snoop.py'" >> .bashrc

# Пользователь также может выполнить быструю проверку интересующего его сайта по БД,
# не используя опцию "--list-all", используя команду "snoopcheck"
$ cd && printf "alias snoopcheck='cd && cd snoop && printf 2 | python snoop.py --list-all | grep -i'" >> .bashrc  
# перезапустить Termux.

# ПРИМЕЧАНИЕ_3!: для авто-открытия результатов поиска во внешнем web-browser пользователь должен указать версию
# своего Android (7, 8, 9, 10 и т.д.) в файле '~/snoop/config android.txt' (одна строчка). Надстройка - это компромисс между 
# нестандартизированными между собой: Python --> Termux --> Android. По умолчанию config настроен на использование Android 10+.
# ПРИМЕЧАНИЕ_4!: после отключения РФ от Лондонской точки обмена интернет-трафиком скорость поиска Snoop на моб.операторах Мегафон/Yota упала в 2 раза.
```
<p align="center">  
  <img src="https://raw.githubusercontent.com/snooppr/snoop/master/images/Android%20snoop_run.gif" width="40%" />  
</p>  

</details>

<details>
<summary>Основные ошибки/Basic errors in</summary>

|  Сторона  |                         Проблема                      | Решение |
|:---------:| ------------------------------------------------------|:-------:|
| ========= |=======================================================| ======= |
| Клиент    |Блокировка соединения проактивной защитой (*Kaspersky) |    1    |
|           |Недостаточная скорость интернет соединения EDGE/3G     |    2    |
|           |Слишком низкое значение опции '-t'                     |    2    |
|           |недопустимое nickname                                  |    3    |
|           |Ошибки соединения: [GipsysTeam; RamblerDaing; Mamochki |    7    |
|           |                    Virtualireland; Forum_rzn; Ddo]    |    7    |
|           |Ошибки соединения: [PayPal]                            |    4    |
| ========= |=======================================================| ======= |
| Провайдер |Internet Censorship                                    |    4    |
| ========= |=======================================================| ======= |
| Сервер    |Cайт изменил свой ответ/API; обновился CF/WAF          |    5    |
|           |Блокировка сервером диапазона ip-адресов клиента       |    4    |
|           |Срабатывание/защита ресурса captch-ей                  |    4    |
|           |Некоторые сайты временно недоступны, технические работы|    6    |
| ========= |=======================================================| ======= |

Решения:
1. Перенастроить свой Firewall (например, Kaspersky блочит Ресурсы для взрослых).

2. Проверить скорость своего интернет соединения:  
$ python3 snoop.py -v nickname  
Если какой-либо из параметров сети выделен красным цветом, Snoop может подвисать во время поиска.  
При низкой скорости увеличить значение 'x' опции '--time-out x':  
$ python3 snoop.py -t 15 nickname  

3. Фактически это не ошибка. Исправить nickname  
(например, на некоторых сайтах недопустимы символы кириллицы; "пробелы"; или 'вьетнамо-китайская_кодировка'
в именах пользователей, в целях экономии времени: — запросы фильтруются).

4. **Сменить свой ip-адрес**  
("Серый" ip и цензура - самое распространенное из-за чего пользователь получает ошибки пропуска/ложного срабатывания/и в некоторых случаях '**Увы**'.
Иногда: при частом повторном сканировании — сервер конкретного ресурса может заблочить ip-адрес клиента на некоторое время.  
При использовании Snoop с IP адреса провайдера мобильного оператора скорость **может** упасть в разы, зависит от провайдера.  
Например, самый действенный способ решить проблему — **ИСПОЛЬЗОВАТЬ VPN**, Tor слабо подходит на роль помощника).  

<p align="center">  
  <img src="https://raw.githubusercontent.com/snooppr/snoop/master/images/censorship.png" width="70%" />  
</p>  

5. Открыть в Snoop репозитории на Github-e Issue/Pull request  
(сообщить об этом разработчику).

6. Не обращать внимание, сайты иногда уходят на ремонтные работы и возвращаются в строй.

7. [Проблема](https://wiki.debian.org/ContinuousIntegration/TriagingTips/openssl-1.1.1 "проблема простая и решаемая") с openssl в некоторых дистрибутивах GNU/Linux.  
Решение:
```
$ sudo nano /etc/ssl/openssl.cnf

# Изменить в самом низу файла строки:
[MinProtocol = TLSv1.2]
на
[MinProtocol = TLSv1]

[CipherString = DEFAULT@SECLEVEL=2]
на
[CipherString = DEFAULT@SECLEVEL=1]
```
</details>

<details>
<summary>Дополнительная информация/Additional information</summary>

 • [История развития проекта/History](https://raw.githubusercontent.com/snooppr/snoop/master/changelog.txt "Project development history")  

 • [Лицензия Snoop Project/License](https://github.com/snooppr/snoop/blob/master/COPYRIGHT)  

 • [Документация/Documentation](https://drive.google.com/open?id=12DzAQMgTcgeG-zJrfDxpUbFjlXcBq5ih)  

 • **Отпечаток публичного ключа:**	[076DB9A00B583FFB606964322F1154A0203EAE9D](https://raw.githubusercontent.com/snooppr/snoop/master/PublicKey.asc "pgp key")  

 • **Информация для госслужащих:** Snoop Project включен в реестр отечественного ПО с заявленным кодом: 26.30.11.16 Программное Обеспечение, обеспечивающее выполнение установленных действий при проведении оперативно-розыскных мероприятий.
Приказ Минкомсвязи РФ №515 реестровый № 7012.  

 • **Snoop неидеален:** вэб-сайты падают; закрывающие теги отсутсвуют; хостинги вовремя не оплачиваются.
Время от времени необходимо следить за всем этим "Web rock 'n' roll", поэтому донаты приветствуются:
[Примеры коррекции БД/Example close/bad websites](https://drive.google.com/file/d/1CJxGRJECezDsaGwxpEw34iJ8MJ9LXCIG/view?usp=sharing)  
BTC (donation): 1Ae5uUrmUnTjRzYEJ1KkvEY51r4hDGgNd8  

 • **27 января сжатие репозитория/если возникли проблемы сделайте 'git clone' по новому**  

 • **email:** snoopproject@protonmail.com
</details>
