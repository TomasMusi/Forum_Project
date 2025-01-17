Typicky se přihlášení děla věma způsoby


1. Session Token

    - token představuje random vygenerovany string 
    - Tento token poté vždy přečte server, podívá se do nějaké své databáze a najde si naše data pod tímto tokenem

    ```JSON
    {
        "ead19ebf488bf650125e57f72f2e1024ed6ed294": {
            "id": 20,
            "username": "pepik",
            "permissions": ["forum.thread.create", "forum.user.ban"],
            "dalsi": "data",
            "toto_jsou_dalsi": "data ktere muse mit uzivatel ulozen atd.."
        }
    }
    ```

    - Pojďme si k tomu říct nějaké výhody/Nevýhody
    - Výhody:
        - Uživatel se identifikuje pouze tokenem
        - Data jsou uložena na serveru, takže si uživatel nemůže přečíst, co u něho máme uloženo
    - Nevýhody:
        - Data jsou uložena na serveru, takže ke každému uživateli musíme mít něco uloženo (zabírá to místo na serveru)
        - Musíme někam šahat na disk pro data, takže možné zdržení




2. JWT (Json Web Token):

    - Tento princip funguje tak, že v tokenu je uložen JSON s daty uživatele
    - https://jwt.io/

    - Typicky se skládá ze tří částí oddělené tečkou:
        1. Informace o hashovacím algoritmu
        2. Data
        3. Podpis dat

    - Vypadá takto:
    ```JSON
    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
    ```
    - Data tím pádem neukládáme na serveru, ale rovnou v daném tokenu
    - Určitě si ale říkáte, však si uživatel může tento token upravit/přečíst informace
    - Tak s přečtením informací, by neměl být problém, protože zde neukládáme nic tajného
    - Typicky co všechno máme v cookies vypisujeme na web: username, id
    - Můžeme tam mít například i permisse

    - A teď se dostáváme k druhé části a to co když si to uživatel upraví
    - Díky použití algorimu, typicky algoricky HMAC, které k hashování používají ještě klíč, ten typicky máme uložený na serveru v .env
    - Když si někdo proto změní tyto cookies, nemá jak data zahashovat správně a potom náš server při validaci hodí chybu a typicky bere uživatele jako nepřihlášeného

    - Pojďme se podívat na výhody/nevýhody
    - Výhody:
        - Data jsou rovnou uložena u uživatele, tedy nepotřebujeme na serveru nic ukládat
    - Nevýhody:
        - Uživatel si dokáže data přečist (ale neměl by to být problém, nemáme zde schovávat tajná data)


Fun fact: PHP využívat první možnost a session tokeny uchovává do souboru:
![image](https://github.com/user-attachments/assets/f0d7280d-be4e-438c-97d9-62d08e7b8740)

