## PAP21L-Z07
### Członkowie zespołu:
- **Piotr Hondra**
- **Kamil Szczepanik**
- **Michał Taczała**

### Temat Projektu: **System umawiania wizyt lekarskich w klinice**
System pozwalający pacjentom kliniki na umawianie się na wizyty lekarskie. Priorytetowym wymaganiem jest funkcjonalne umawianie wizyt, odwoływanie ich, zmiany terminu z poziomu pacjenta I administratora. Dodatkowo system musi zapewnić lekarzom możność  prowadzenia kalendarza pracy tzn. wprowadzenia dostępnych terminów wizyt, ukrycie tych terminów przed pacjentami, zmiany tych terminów. Pacjent powinien mieć także prowadzoną swoją kartę zdrowia, w której będą informacje o przeszłych wizytach, lekach jakie pacjent brał. Priorytetem jest również stworzenie systemu logowania się dla wszystkich użytkowników. 


## Założenia projektowe:

**Interfejsy:**

- Logowanie
- Administratorzy
- Lekarze
- Pacjenci
  - Dashboard
    - Historia
      - Podsumowanie wizyty
    - Na górze następna wizyta
  - Kalendarz dostępnych terminów
  - Prywatna wiadomość do lekarza\*

**Funkcjonalności:**

1. System logowania
2. Umówienie wizyty
3. Odwoływanie wizyt
4. Zmiana terminu wizyty
5. Dodanie godzin dyspozycyjnych
6. Ukryj/pokaż dostępne terminy
7. Eksportowanie kalendarza\*
8. Skierowania\*

**Informacje o użytkowniku:**

- Administratorzy
  - Imię
  - Nazwisko
- Lekarze
  - Imię
  - Nazwisko
  - specjalizacja
- Pacjenci
  - Imię
  - Nazwisko
  - Pesel
  - Historia wizyt


**Wstępna specyfikacja technologii:**

- Java
- HTML
- CSS
- Spring
- PostgreSQL
