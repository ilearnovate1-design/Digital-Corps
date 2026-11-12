import { AcademyCourse } from '../../types';

export const COURSE_SPREADSHEET_MASTERY: AcademyCourse = {
  courseId: 'course_spreadsheet_mastery',
  categoryId: 'data_digital_skills',
  title: 'Spreadsheet Mastery, Data Analysis and Visualisation',
  description: 'A comprehensive, job-ready course taking corps members from spreadsheet basics to advanced data manipulation, data cleaning (handling Nigerian phone number formats and messy exports), formula mastery (XLOOKUP, SUMIFS, COUNTIFS), pivot tables, and executive dashboard design in Google Sheets and Microsoft Excel.',
  targetAudience: 'Serving NYSC Corps Members, aspiring data analysts, school administrators, financial officers, inventory managers, and researchers.',
  entryRequirements: 'A smartphone or computer with internet access and basic spreadsheet familiarity.',
  expectedDuration: '4 Weeks (Self-Paced • 12 Core Lessons)',
  themeColor: 'rose',
  iconName: 'BarChart2',
  active: true,
  version: '2026.1',
  youtubeUrl: 'https://www.youtube.com/playlist?list=PL_XQ6-mFz_UfM5_X-M3_X_M3_X_M3_X_R',
  youtubeChannelId: 'UC_XQ6-mFz_UfM5_X-M3_X_R',
  learningObjectives: [
    {
      id: 'DAT-FND-01',
      code: 'DAT-FND-01',
      title: 'Data Fundamentals & Spreadsheet Structure',
      description: 'Differentiate structured vs. unstructured data, manage workbooks/worksheets, and understand cell references.'
    },
    {
      id: 'DAT-FRM-02',
      code: 'DAT-FRM-02',
      title: 'Intermediate & Advanced Formulas',
      description: 'Master conditional aggregation (SUMIFS, COUNTIFS), dynamic lookup functions (XLOOKUP, VLOOKUP), and text formulas (TRIM, PROPER).'
    },
    {
      id: 'DAT-CLN-03',
      code: 'DAT-CLN-03',
      title: 'Data Cleaning & Exploratory Analysis',
      description: 'Deduplicate records, standardize inconsistent entries, handle missing values, and calculate descriptive statistics.'
    },
    {
      id: 'DAT-VIS-04',
      code: 'DAT-VIS-04',
      title: 'Data Visualisation, Dashboards & Storytelling',
      description: 'Select appropriate chart types, build interactive KPI dashboards, and communicate data-driven recommendations.'
    }
  ],
  modules: [
    {
      moduleId: 'mod_dat_1',
      courseId: 'course_spreadsheet_mastery',
      sequence: 1,
      sequenceLabel: 'Module 1',
      title: 'Data Fundamentals and Spreadsheet Architecture',
      description: 'Grasp the core principles of structured datasets, clean data entry standards, and workbook organization.',
      learningObjectiveIds: ['DAT-FND-01'],
      lessons: [
        {
          lessonId: 'lesson_dat_1_1',
          moduleId: 'mod_dat_1',
          courseId: 'course_spreadsheet_mastery',
          title: 'Understanding Data: Types, Quality and Decision-Making',
          sequence: 1,
          sequenceLabel: 'Lesson 1.1',
          estimatedDurationMinutes: 25,
          learningObjectiveIds: ['DAT-FND-01'],
          introduction: 'Data is the lifeblood of modern governance and business strategy. Learn the distinction between structured tabular data and unstructured text, and understand how evidence-based decision-making works.',
          lessonContent: [
            'What is Data? Qualitative data describes qualities or characteristics (e.g. eye color, school name, satisfaction rating); Quantitative data measures quantities with numbers (e.g. student test scores, daily revenue in Naira, attendance count).',
            'Structured vs. Unstructured Data: Structured data lives in standardized tables with defined rows and columns (e.g. an SQL database or Google Sheet). Unstructured data includes freeform emails, voice notes, PDFs, and social media videos that lack a predefined data model.',
            'The High Cost of Poor Data Quality: "Garbage In, Garbage Out." Inaccurate data entry leads to wrong business investments, misallocated government budgets, and flawed research conclusions.',
            'Evidence-Based Decision-Making: Moving away from subjective "gut feeling" or intuition toward empirical verification backed by reliable spreadsheet datasets.'
          ],
          nigerianContextExamples: [
            'A state primary healthcare agency in Nigeria analyzing quantitative immunization numbers to identify which LGAs suffer vaccine stockouts.',
            'An SME evaluating monthly sales data across branches to determine whether opening a new outlet in Ikeja or Lekki is financially viable.'
          ],
          practicalDemonstration: 'Examine two datasets: One messy unstructured paragraph of notes vs. one clean, tidy table with distinct columns (Date, Region, Metric, Value).',
          handsOnExercise: {
            title: 'Classify 10 Real-World Data Points',
            task: 'Classify ten sample data points from an NYSC camp or PPA into Qualitative vs. Quantitative, and Discrete vs. Continuous.',
            steps: [
              'Data points: State code, Height in cm, Platoon number, Gender, Monthly stipend amount, Exam score, etc.',
              'Categorize each into its precise mathematical data type.',
              'Identify potential data entry errors in messy text samples.'
            ],
            deliverable: 'A 10-item data classification table.'
          },
          keyTakeaways: [
            'Quantitative data is numerical; qualitative data is descriptive/categorical.',
            'Structured tabular datasets are required for reliable analytical modeling.',
            'High-quality data is the non-negotiable foundation of evidence-based decisions.'
          ],
          knowledgeCheck: [
            {
              id: 'kc_dat_1_1_1',
              questionText: 'What is the primary difference between Quantitative and Qualitative data?',
              options: [
                'Quantitative data is measured in numbers and quantities, whereas Qualitative data describes categorical attributes and characteristics',
                'Quantitative data is only used in Nigeria, while Qualitative is international',
                'Qualitative data can only be typed in Microsoft Word',
                'There is no difference between the two terms'
              ],
              correctAnswer: 0,
              explanation: 'Quantitative data represents numerical measurements (e.g. scores, revenue), while qualitative data captures non-numerical qualities and classifications.'
            }
          ]
        },
        {
          lessonId: 'lesson_dat_1_2',
          moduleId: 'mod_dat_1',
          courseId: 'course_spreadsheet_mastery',
          title: 'Collecting and Organizing Data: Tabular Architecture Standards',
          sequence: 2,
          sequenceLabel: 'Lesson 1.2',
          estimatedDurationMinutes: 30,
          learningObjectiveIds: ['DAT-FND-01'],
          introduction: 'Master Hadley Wickham\'s famous "Tidy Data" principles: Each variable must have its own column, each observation must have its own row, and each value must have its own cell.',
          lessonContent: [
            'The Golden Rules of Tabular Architecture:',
            '1. One Row per Observation: Never merge multiple records into a single cell.',
            '2. One Column per Attribute: Do not combine First Name, Surname, and Phone Number in a single column; give each its own distinct column.',
            '3. Single Header Row: Never use multiple stacked header rows with merged cells above your data; stacked headers break automated filters, pivot tables, and formula references.',
            '4. Consistent Categorical Values: Do not mix "Male", "M", "male", and "MALE" in the same column. Choose one standard convention and enforce it.',
            'Data Validation Dropdowns: Use `Data → Data validation → List of items` to force users to select from a predefined dropdown (e.g. Platoon 1 to 10), eliminating typing errors at the point of data entry.'
          ],
          nigerianContextExamples: [
            'Designing an NYSC camp attendance sheet where state codes, platoons, and contact numbers each inhabit dedicated, validated columns.',
            'Using Data Validation to force secondary school teachers to enter grades strictly between 0 and 100, preventing accidental entries like 900.'
          ],
          practicalDemonstration: 'Demonstrate Data Validation in Google Sheets: Setting a rule where Column C only allows integers between 1 and 10, showing how the sheet rejects invalid inputs with an alert message.',
          handsOnExercise: {
            title: 'Convert a Messy Spreadsheet into a Tidy Architecture Table',
            task: 'Take a poorly formatted table with merged cells and combined text and rebuild it following tidy data rules.',
            steps: [
              'Separate combined names into `FirstName` and `Surname` columns.',
              'Unmerge all merged cells and fill missing values.',
              'Add Data Validation dropdowns for `Gender` (Male, Female) and `State`.',
              'Ensure Row 1 is a clean single header row.'
            ],
            deliverable: 'Your restructured, tidy spreadsheet link.'
          },
          keyTakeaways: [
            'Follow Tidy Data rules: Each variable in its own column, each observation in its own row.',
            'Never use merged cells within tabular data ranges; merged cells break formulas and sorting.',
            'Use Data Validation dropdowns to prevent typos at the point of data capture.'
          ],
          knowledgeCheck: [
            {
              id: 'kc_dat_1_2_1',
              questionText: 'Why do data analysts strictly advise against merging cells inside a data table in Google Sheets or Excel?',
              options: [
                'Merged cells cause computers to overheat',
                'Merged cells corrupt tabular data architecture, preventing formulas, sorting, filtering, and pivot tables from reading rows correctly',
                'Merged cells turn all numbers into negative values',
                'Merged cells can only be opened on desktop computers'
              ],
              correctAnswer: 1,
              explanation: 'Merged cells break rectangular grid integrity, rendering automated formulas, multi-column sorting, and pivot table aggregation impossible.'
            }
          ]
        },
        {
          lessonId: 'lesson_dat_1_3',
          moduleId: 'mod_dat_1',
          courseId: 'course_spreadsheet_mastery',
          title: 'Understanding Spreadsheet Structure and Cell References',
          sequence: 3,
          sequenceLabel: 'Lesson 1.3',
          estimatedDurationMinutes: 25,
          learningObjectiveIds: ['DAT-FND-01'],
          introduction: 'Master cross-sheet references, 3D formulas, named ranges, and mixed cell references (`$A1` vs. `A$1`) to build complex, interconnected analytical models.',
          lessonContent: [
            'Cross-Sheet Referencing: Pulling data across multiple worksheets in the same workbook: `=Sheet2!B4` or `=\'Monthly Sales\'!D10`. This allows you to keep raw data on one sheet and summary reports on another.',
            'Mixed Cell References:',
            '• `$A1` (Absolute Column, Relative Row): When copied across, the column remains locked to A, but the row shifts down.',
            '• `A$1` (Relative Column, Absolute Row): When copied down, the row remains locked to 1, but the column shifts across.',
            'Named Ranges: Giving human-friendly names to cell ranges (e.g. naming cells `E2:E100` as `TotalRevenue`). Formulas become self-documenting: `=SUM(TotalRevenue)` instead of `=SUM(E2:E100)`.',
            'Protecting Ranges & Sheets: Right-click a tab → `Protect sheet` to prevent other users from accidentally editing or deleting complex formula cells while allowing them to enter data in specific input ranges.'
          ],
          nigerianContextExamples: [
            'Referencing a central "ExchangeRates" tab across 12 monthly expense sheets to calculate budget conversions in Naira automatically.',
            'Protecting the formula columns on an NYSC platoon ranking sheet so colleagues can only input scores without breaking ranking math.'
          ],
          practicalDemonstration: 'Demonstrate Named Ranges: Name a range `Scores`, write `=AVERAGE(Scores)`, and show how easy it is to read and maintain compared to raw cell references.',
          handsOnExercise: {
            title: 'Build a Multi-Sheet Model with Cross-Sheet References and Named Ranges',
            task: 'Create a 2-sheet workbook where Sheet 2 calculates summary KPIs from Sheet 1 data.',
            steps: [
              'Sheet 1 (`RawData`): 10 rows of transactions with columns `Item`, `Quantity`, `Price`.',
              'Define Named Range `RevenueRange` for total amounts.',
              'Sheet 2 (`SummaryReport`): Calculate total and average revenue referencing Sheet 1.',
              'Protect the summary sheet formulas.'
            ],
            deliverable: 'Your multi-sheet model link demonstrating cross-sheet formulas.'
          },
          keyTakeaways: [
            'Keep raw data and analytical reports on separate worksheets using cross-sheet references (`SheetName!Cell`).',
            'Named ranges transform cryptic cell coordinates into readable, self-documenting business logic.',
            'Use sheet protection to safeguard formulas from accidental corruption.'
          ],
          knowledgeCheck: [
            {
              id: 'kc_dat_1_3_1',
              questionText: 'In a Google Sheets workbook with two tabs named "January" and "Summary", how do you reference cell B5 from the January tab inside a formula on the Summary tab?',
              options: [
                '`=January:B5`',
                '`=January!B5`',
                '`=January#B5`',
                '`=January@B5`'
              ],
              correctAnswer: 1,
              explanation: 'Cross-sheet references use the exclamation mark: `=SheetName!CellAddress` (e.g. `=January!B5`).'
            }
          ]
        }
      ]
    },
    {
      moduleId: 'mod_dat_2',
      courseId: 'course_spreadsheet_mastery',
      sequence: 2,
      sequenceLabel: 'Module 2',
      title: 'Intermediate and Advanced Spreadsheet Functions',
      description: 'Master advanced multi-criteria aggregation (SUMIFS, COUNTIFS), text transformation formulas, and modern dynamic lookup functions (XLOOKUP).',
      learningObjectiveIds: ['DAT-FRM-02'],
      lessons: [
        {
          lessonId: 'lesson_dat_2_1',
          moduleId: 'mod_dat_2',
          courseId: 'course_spreadsheet_mastery',
          title: 'Text Transformation and Cleaning Formulas: TRIM, PROPER, and CONCAT',
          sequence: 1,
          sequenceLabel: 'Lesson 2.1',
          estimatedDurationMinutes: 30,
          learningObjectiveIds: ['DAT-FRM-02'],
          introduction: 'Raw human-entered data is filled with invisible trailing spaces, messy capitalization, and fragmented fields. Master text functions to standardize text programmatically.',
          lessonContent: [
            '1. `=TRIM(text)`: Removes all leading, trailing, and repeated spaces from text strings. Trailing spaces (e.g. `"Lagos "` vs. `"Lagos"`) cause `VLOOKUP` and `XLOOKUP` to fail completely!',
            '2. `=PROPER(text)`: Converts messy text into Proper Title Case (e.g. converts `"john doe"` or `"JOHN DOE"` into `"John Doe"`).',
            '3. `=UPPER(text)` and `=LOWER(text)`: Standardizes text into all uppercase or lowercase (essential for state codes: `=UPPER(A2)` converts `la/26a/1234` into `LA/26A/1234`).',
            '4. Concatenation (`&` or `=CONCATENATE()`): Joining multiple text columns together. E.g., `=A2 & " " & B2` combines First Name and Surname into a clean Full Name column.',
            '5. Splitting Text (`SPLIT` or Text-to-Columns): Separating full names into first and last names based on a delimiter space.'
          ],
          nigerianContextExamples: [
            'Cleaning a 300-row NYSC orientation camp attendance list: Using `=TRIM(PROPER(A2))` to fix names typed in erratic lowercase, uppercase, and with accidental spacebars.',
            'Converting messy state codes entered by corps members into clean uppercase format: `=UPPER(TRIM(C2))`.'
          ],
          practicalDemonstration: 'Demonstrate how a hidden trailing space in cell A1 breaks an `=A1=B1` equality comparison, and show how `=TRIM()` resolves the mismatch instantly.',
          handsOnExercise: {
            title: 'Clean a Messy 15-Row Contact List Using Text Formulas',
            task: 'Clean a raw export of names and state codes using text functions.',
            steps: [
              'Use `=TRIM()` to strip extra spaces.',
              'Use `=PROPER()` to standardize name casing.',
              'Use `=UPPER()` to standardize state codes.',
              'Combine First Name and Surname into a `FullName` column using the `&` operator.'
            ],
            deliverable: 'Your clean text formula workbook link.'
          },
          keyTakeaways: [
            'Invisible trailing spaces are the #1 cause of broken lookup formulas; always apply `=TRIM()`.',
            'Use `=PROPER()` for human names and `=UPPER()` for official acronyms and state codes.',
            'Combine text strings easily using the ampersand (`&`) operator.'
          ],
          knowledgeCheck: [
            {
              id: 'kc_dat_2_1_1',
              questionText: 'What is the primary function of the `=TRIM()` formula in spreadsheets?',
              options: [
                'It deletes the entire row',
                'It removes all leading, trailing, and accidental multiple spaces from a text string',
                'It trims the cost of a project by 10%',
                'It shortens long words to five letters'
              ],
              correctAnswer: 1,
              explanation: '`=TRIM()` removes invisible extra spaces, ensuring that lookups and database matching algorithms function reliably.'
            }
          ]
        },
        {
          lessonId: 'lesson_dat_2_2',
          moduleId: 'mod_dat_2',
          courseId: 'course_spreadsheet_mastery',
          title: 'Conditional Aggregations: SUMIF, SUMIFS, COUNTIF, and COUNTIFS',
          sequence: 2,
          sequenceLabel: 'Lesson 2.2',
          estimatedDurationMinutes: 35,
          learningObjectiveIds: ['DAT-FRM-02'],
          introduction: 'Go beyond basic totals. Learn how to calculate conditional sums and counts based on single or multiple criteria across large datasets.',
          lessonContent: [
            '1. `=COUNTIF(range, criterion)`: Counts cells meeting a condition. E.g., `=COUNTIF(C2:C100, "Platoon 4")` counts how many corps members are in Platoon 4.',
            '2. `=SUMIF(criteria_range, criterion, [sum_range])`: Sums values if a condition is met. E.g., `=SUMIF(B2:B100, "Lagos", D2:D100)` sums revenue from Lagos orders.',
            '3. `=COUNTIFS(criteria_range1, criterion1, criteria_range2, criterion2, ...)`: Evaluates MULTIPLE criteria simultaneously. E.g., `=COUNTIFS(B2:B100, 4, D2:D100, ">=6")` counts how many participants in Platoon 4 achieved qualifying quiz scores (>= 6).',
            '4. `=SUMIFS(sum_range, criteria_range1, criterion1, criteria_range2, criterion2, ...)`: Notice that in `SUMIFS`, the sum range comes FIRST! Sums values matching multiple simultaneous conditions (e.g. Sales in March for Product A).'
          ],
          nigerianContextExamples: [
            'Calculating official NYSC Platoon leaderboard scores: Using `=COUNTIFS(PlatoonRange, 1, ScoreRange, ">=6")` to count distinct qualifying participants for Platoon 1.',
            'A market cooperative calculating total micro-loan disbursements to female traders in Kaduna using `=SUMIFS()`.'
          ],
          practicalDemonstration: 'Compare `COUNTIF` vs. `COUNTIFS`: Show how adding a second criterion (e.g. Platoon = 3 AND Score >= 6) isolates competition qualifiers instantly.',
          handsOnExercise: {
            title: 'Build a Platoon Performance Aggregation Table Using COUNTIFS',
            task: 'Construct an automated summary table aggregating 50 quiz records across Platoons 1 to 5.',
            steps: [
              'Columns in raw sheet: `Name`, `Platoon`, `Score`.',
              'Build a summary table with columns: `Platoon`, `Total Entrants`, `Qualifiers (>=6)`.',
              'Use `=COUNTIF()` for Total Entrants and `=COUNTIFS()` for Qualifiers.',
              'Calculate the qualification percentage.'
            ],
            deliverable: 'Your automated COUNTIFS summary table link.'
          },
          keyTakeaways: [
            'Use `COUNTIF` / `SUMIF` for single criteria and `COUNTIFS` / `SUMIFS` for multiple criteria.',
            'In `SUMIFS`, the `sum_range` is always the first argument, followed by criteria pairs.',
            'Enclose logical operators in quotation marks when referencing numbers (e.g. `">=6"`).'
          ],
          knowledgeCheck: [
            {
              id: 'kc_dat_2_2_1',
              questionText: 'Which formula in Google Sheets will count how many participants in Platoon 3 (Column B) scored 6 or higher (Column C)?',
              options: [
                '`=SUMIF(B:B, 3, C:C, ">=6")`',
                '`=COUNTIFS(B:B, 3, C:C, ">=6")`',
                '`=AVERAGEIF(B:B, 3, C:C)`',
                '`=COUNT(B:B = 3 AND C:C >= 6)`'
              ],
              correctAnswer: 1,
              explanation: '`=COUNTIFS(B:B, 3, C:C, ">=6")` evaluates both criteria simultaneously: Platoon equals 3 AND score is greater than or equal to 6.'
            }
          ]
        },
        {
          lessonId: 'lesson_dat_2_3',
          moduleId: 'mod_dat_2',
          courseId: 'course_spreadsheet_mastery',
          title: 'Lookup Functions: From VLOOKUP to the Superior XLOOKUP',
          sequence: 3,
          sequenceLabel: 'Lesson 2.3',
          estimatedDurationMinutes: 35,
          learningObjectiveIds: ['DAT-FRM-02'],
          introduction: 'Connecting separate datasets is the hallmark of data analysis. Learn the limitations of traditional VLOOKUP and master modern, robust XLOOKUP.',
          lessonContent: [
            'The Concept of a Lookup: Matching a unique identifier (e.g. State Code or Registration ID) in one table to pull corresponding information (e.g. Full Name or Platoon) from another master table.',
            'The Fatal Flaws of Legacy `VLOOKUP`: 1. It can only look from left to right (the lookup key must be in column 1); 2. Inserting a new column breaks the hardcoded index number; 3. Defaults to approximate match if you forget `, FALSE`.',
            'The Power of Modern `XLOOKUP`: Syntax: `=XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found], [match_mode])`.',
            '• Works in any direction (left-to-right or right-to-left).',
            '• Immune to column insertion breaks.',
            '• Defaults to exact match.',
            '• Has built-in error handling: if a State Code is not found, it displays "Not Registered" instead of an ugly `#N/A` error!'
          ],
          nigerianContextExamples: [
            'Using `=XLOOKUP(A2, MasterRoster!StateCode, MasterRoster!Platoon, "Unassigned")` to automatically assign platoons to quiz submissions using their NYSC State Code.',
            'Matching participant phone numbers to payment transaction IDs across two separate bank exports.'
          ],
          practicalDemonstration: 'Demonstrate `XLOOKUP` pulling data from the left of the lookup key, proving that legacy `VLOOKUP` would fail without rearranging the dataset.',
          handsOnExercise: {
            title: 'Merge Two Separate Tables Using XLOOKUP with Error Handling',
            task: 'Connect a quiz score table with a participant master registration directory.',
            steps: [
              'Table 1 (`Submissions`): `StateCode`, `Score`.',
              'Table 2 (`MasterDirectory`): `StateCode`, `FullName`, `Platoon`, `DeploymentLGA`.',
              'Use `=XLOOKUP()` on Table 1 to pull Full Name and Platoon from Table 2.',
              'Set `[if_not_found]` to display `"Not in Camp Roster"`.'
            ],
            deliverable: 'Your merged lookup model link.'
          },
          keyTakeaways: [
            'XLOOKUP replaces both VLOOKUP and INDEX/MATCH with a cleaner, bidirectional syntax.',
            'XLOOKUP defaults to exact match and does not break when columns are inserted.',
            'Use the built-in `[if_not_found]` argument to eliminate ugly `#N/A` errors gracefully.'
          ],
          knowledgeCheck: [
            {
              id: 'kc_dat_2_3_1',
              questionText: 'What is a major advantage of `XLOOKUP` over legacy `VLOOKUP` in Google Sheets and Excel?',
              options: [
                '`XLOOKUP` can only look up words starting with the letter X',
                '`XLOOKUP` works in any direction (left or right), does not break when columns are added, and has built-in error handling',
                '`XLOOKUP` charges a monthly license fee',
                '`XLOOKUP` converts all numbers into text'
              ],
              correctAnswer: 1,
              explanation: '`XLOOKUP` is bidirectional, resilient to column shifts, defaults to exact match, and handles missing records without throwing `#N/A`.'
            }
          ]
        }
      ]
    },
    {
      moduleId: 'mod_dat_3',
      courseId: 'course_spreadsheet_mastery',
      sequence: 3,
      sequenceLabel: 'Module 3',
      title: 'Data Cleaning, Quality Auditing, and Analysis',
      description: 'Master practical data hygiene: handling missing values, deduplicating databases, cleaning Nigerian phone number formats, and generating descriptive statistics.',
      learningObjectiveIds: ['DAT-CLN-03'],
      lessons: [
        {
          lessonId: 'lesson_dat_3_1',
          moduleId: 'mod_dat_3',
          courseId: 'course_spreadsheet_mastery',
          title: 'Understanding Data Quality: Anomalies, Outliers, and Missing Data',
          sequence: 1,
          sequenceLabel: 'Lesson 3.1',
          estimatedDurationMinutes: 25,
          learningObjectiveIds: ['DAT-CLN-03'],
          introduction: 'Data in the real world is messy. Learn how to systematically audit datasets for missing values, duplicate entries, data type mismatches, and mathematical outliers.',
          lessonContent: [
            'The Dimensions of Data Quality:',
            '• Completeness: Are required fields (e.g. State Code or Phone Number) populated?',
            '• Uniqueness: Are there duplicate records representing the same participant?',
            '• Validity: Do values conform to expected syntax and range (e.g. age between 18-35)?',
            '• Consistency: Does the same record match across different system exports?',
            'Handling Missing Data: Deletion (dropping rows with missing primary keys), Imputation (replacing missing values with median/mode), or Flagging (marking as "Unknown").',
            'Detecting Statistical Outliers: An outlier is a data point that differs significantly from other observations (e.g. a student test score of 120 on a 100-point test). Sorting min/max reveals impossible entries instantly.'
          ],
          nigerianContextExamples: [
            'Auditing an NYSC platoon registration sheet to identify duplicate registrations caused by corps members submitting the registration form three times due to slow network.',
            'Detecting an impossible age entry of "200" on a community health screening intake form.'
          ],
          practicalDemonstration: 'Demonstrate using `Data → Data cleanup → Cleanup suggestions` to detect duplicate rows and whitespace anomalies in a single click.',
          handsOnExercise: {
            title: 'Perform a Data Quality Audit on a 30-Row Sample Dataset',
            task: 'Inspect a raw dataset and document all detected anomalies.',
            steps: [
              'Identify duplicate participant entries.',
              'Identify missing required fields.',
              'Identify impossible numerical outliers.',
              'Categorize each error and write a proposed cleaning action.'
            ],
            deliverable: 'A 1-page Data Quality Audit Report.'
          },
          keyTakeaways: [
            'Audit datasets across Completeness, Uniqueness, Validity, and Consistency.',
            'Sort minimum and maximum values to quickly spot impossible numerical outliers.',
            'Document data cleaning decisions to maintain analytical reproducibility.'
          ],
          knowledgeCheck: [
            {
              id: 'kc_dat_3_1_1',
              questionText: 'When auditing a participant quiz dataset where the maximum possible score is 10, you discover a row with a score of 100. What is this anomaly called?',
              options: [
                'A brilliant participant',
                'A data entry outlier or invalid range anomaly that must be flagged and corrected',
                'A normal random event',
                'A computer font error'
              ],
              correctAnswer: 1,
              explanation: 'A value of 100 on a 10-point scale is an invalid outlier resulting from a data entry error or formatting glitch.'
            }
          ]
        },
        {
          lessonId: 'lesson_dat_3_2',
          moduleId: 'mod_dat_3',
          courseId: 'course_spreadsheet_mastery',
          title: 'Cleaning and Standardizing Data: Deduplication and Nigerian Phone Formats',
          sequence: 2,
          sequenceLabel: 'Lesson 3.2',
          estimatedDurationMinutes: 35,
          learningObjectiveIds: ['DAT-CLN-03'],
          introduction: 'Master data cleaning workflows in Nigeria: solving the infamous leading-zero phone number problem, standardizing international country codes (+234), and deduplicating rows.',
          lessonContent: [
            'The Leading Zero Dilemma: When you enter `08012345678` into an unformatted spreadsheet, it treats it as a number and strips the leading zero, leaving `8012345678`! Formatting the column as "Plain Text" preserves the leading zero.',
            'Standardizing Nigerian Phone Formats for WhatsApp & Bulk SMS: Using formulas to convert messy phone numbers (`08012345678`, `2348012345678`, `+234 801 234 5678`) into clean E.164 international format: `+2348012345678`.',
            'Formula: `=IF(LEFT(TRIM(A2), 1)="0", "+234" & RIGHT(TRIM(A2), 10), IF(LEFT(TRIM(A2), 4)="+234", TRIM(A2), "+234" & TRIM(A2)))`.',
            'Removing Duplicates: Highlight table → `Data → Data cleanup → Remove duplicates`. Select the unique identifier column (e.g. State Code) to preserve only the first unique submission.'
          ],
          nigerianContextExamples: [
            'Cleaning a WhatsApp broadcast list of 400 corps members to ensure every number starts with `+234` so the broadcast messaging API delivers successfully.',
            'Deduplicating camp challenge submissions so each platoon only counts unique participant entries.'
          ],
          practicalDemonstration: 'Demonstrate using the Phone Number Standardization formula to convert a column of 20 mixed phone number formats into standardized `+234...` international format in 5 seconds.',
          handsOnExercise: {
            title: 'Standardize 20 Mixed Phone Numbers and Deduplicate Records',
            task: 'Take an unformatted dataset of Nigerian phone numbers and clean it completely.',
            steps: [
              'Format the input column as Plain Text.',
              'Apply the phone cleaning formula to convert all numbers into `+23480...` format.',
              'Use `Data → Data cleanup → Remove duplicates` based on State Code.'
            ],
            deliverable: 'Your cleaned phone number and deduplicated dataset link.'
          },
          keyTakeaways: [
            'Always format phone number columns as Plain Text to prevent spreadsheets from dropping leading zeros.',
            'Use standardized E.164 format (`+234...`) for WhatsApp and automated SMS gateways.',
            'Use native deduplication tools to ensure each participant is counted only once.'
          ],
          knowledgeCheck: [
            {
              id: 'kc_dat_3_2_1',
              questionText: 'Why does Google Sheets or Excel turn a Nigerian phone number like `08110502600` into `8110502600` when you type it?',
              options: [
                'Because the phone number is invalid',
                'Spreadsheets treat unformatted numbers as mathematical values and automatically strip leading zeros; formatting the column as "Plain Text" prevents this',
                'Because telecommunication companies ban the number 0',
                'Because your internet connection was interrupted'
              ],
              correctAnswer: 1,
              explanation: 'In mathematics, leading zeros have no numerical value, so spreadsheets discard them unless the column is explicitly formatted as Plain Text.'
            }
          ]
        },
        {
          lessonId: 'lesson_dat_3_3',
          moduleId: 'mod_dat_3',
          courseId: 'course_spreadsheet_mastery',
          title: 'Exploratory Analysis: Pivot Tables and Descriptive Statistics',
          sequence: 3,
          sequenceLabel: 'Lesson 3.3',
          estimatedDurationMinutes: 35,
          learningObjectiveIds: ['DAT-CLN-03'],
          introduction: 'Pivot Tables are the crown jewel of spreadsheet data analysis. Summarize, slice, dice, and analyze thousands of rows of data in seconds without writing a single formula.',
          lessonContent: [
            'What is a Pivot Table? An interactive summary tool that groups raw transactional rows into meaningful aggregated reports (Sums, Averages, Counts) by dragging and dropping fields into Rows, Columns, Values, and Filters.',
            'The Four Zones of a Pivot Table:',
            '• Rows: Categorical variable to group by (e.g. `Platoon` or `Skill Track`).',
            '• Columns: Secondary category to compare across (e.g. `Gender` or `Qualification Status`).',
            '• Values: Numerical field to calculate (e.g. `Score` summarized as AVERAGE or COUNT).',
            '• Filters: Bounding criteria (e.g. filter by Campaign = "round_1").',
            'Descriptive Statistics in Action: Mean (Average), Median (middle value, resilient to extreme outliers), Mode (most frequent score), Min, and Max.'
          ],
          nigerianContextExamples: [
            'Building a 2-second Pivot Table analyzing 1,000 corps members to show: Average Quiz Score by Platoon and Qualification Count.',
            'Analyzing school terminal exam marks across 6 secondary school classes to find which subject has the lowest median score.'
          ],
          practicalDemonstration: 'Demonstrate creating a Pivot Table from 100 rows in Google Sheets: `Insert → Pivot table`, drag `Platoon` to Rows, drag `Score` to Values as `AVERAGE`, and watch the summary table generate instantly.',
          handsOnExercise: {
            title: 'Build a Multi-Dimensional Pivot Table Report',
            task: 'Construct a Pivot Table analyzing participant performance across Platoons and Skill Tracks.',
            steps: [
              'Use a 50-row dataset of quiz attempts.',
              'Insert a Pivot Table on a new sheet.',
              'Set Rows: `Platoon`.',
              'Set Values: `Score` (Summarized by Average) and `ParticipantId` (Summarized by COUNTA).',
              'Add a Filter for `Qualifying = TRUE`.'
            ],
            deliverable: 'Your completed Pivot Table summary sheet link.'
          },
          keyTakeaways: [
            'Pivot Tables summarize large datasets instantly without complex formula writing.',
            'Use the Median instead of the Mean when dealing with datasets that have extreme outliers.',
            'Drag and drop fields across Rows, Columns, and Values to uncover hidden operational trends.'
          ],
          knowledgeCheck: [
            {
              id: 'kc_dat_3_3_1',
              questionText: 'What is the primary benefit of using a Pivot Table in Google Sheets or Excel?',
              options: [
                'It changes the background color of your computer desktop',
                'It allows you to summarize, group, slice, and calculate averages or counts from thousands of rows of raw data in seconds without writing complex formulas',
                'It deletes half of your records to make the file lighter',
                'It turns spreadsheet text into spoken audio'
              ],
              correctAnswer: 1,
              explanation: 'Pivot tables are the industry standard for rapid exploratory analysis, aggregating voluminous data dynamically through drag-and-drop fields.'
            }
          ]
        }
      ]
    },
    {
      moduleId: 'mod_dat_4',
      courseId: 'course_spreadsheet_mastery',
      sequence: 4,
      sequenceLabel: 'Module 4',
      title: 'Data Visualisation, Dashboards and Storytelling',
      description: 'Select the right charts, design executive KPI dashboards in Google Sheets, and communicate compelling data stories that drive administrative decisions.',
      learningObjectiveIds: ['DAT-VIS-04'],
      lessons: [
        {
          lessonId: 'lesson_dat_4_1',
          moduleId: 'mod_dat_4',
          courseId: 'course_spreadsheet_mastery',
          title: 'Chart Selection: Bar Charts, Line Charts, and Avoiding Bad Pie Charts',
          sequence: 1,
          sequenceLabel: 'Lesson 4.1',
          estimatedDurationMinutes: 30,
          learningObjectiveIds: ['DAT-VIS-04'],
          introduction: 'A chart is worth a thousand numbers—if chosen correctly. Learn the golden rules of chart selection and why data analysts avoid 3D pie charts with 15 slices.',
          lessonContent: [
            'Matching Data to Visualizations:',
            '• Bar / Column Charts: Best for comparing discrete categories (e.g. Average Score across 10 Platoons). Use horizontal bar charts when category labels are lengthy.',
            '• Line Charts: Best for showing continuous trends over time (e.g. Daily registration numbers over 21 days of orientation camp).',
            '• Scatter Plots: Best for discovering correlation between two continuous numerical variables (e.g. Study hours vs. Exam score).',
            'The Sins of Pie Charts: Pie charts should ONLY be used when showing parts of a whole (must sum to 100%), with a maximum of 3 to 5 slices. Human brains struggle to compare angles accurately. Never use 3D pie charts (they distort perspective and mislead viewers).',
            'Chart Hygiene: Always include a descriptive title, clear axis labels, and remove visual clutter (unnecessary background gridlines and garish colors).'
          ],
          nigerianContextExamples: [
            'Using a horizontal bar chart to display Platoon Leaderboard rankings so platoon names are readable without tilting your neck.',
            'Displaying daily NYSC camp registration trends using a clean line chart.'
          ],
          practicalDemonstration: 'Demonstrate turning an unreadable 3D pie chart with 12 tiny slices into a clean, instantly comprehensible horizontal bar chart sorted from highest to lowest.',
          handsOnExercise: {
            title: 'Create 2 Distinct Analytical Charts with Clean Formatting',
            task: 'Build a comparison bar chart and a trend line chart from sample data.',
            steps: [
              'Build Chart 1: Bar chart comparing Platoon Qualifier counts.',
              'Build Chart 2: Line chart showing daily quiz attempts over 7 days.',
              'Format with clean titles, axis labels, and brand colors (emerald/teal).'
            ],
            deliverable: 'Your spreadsheet sheet displaying two formatted charts.'
          },
          keyTakeaways: [
            'Use bar charts for category comparisons and line charts for trends over time.',
            'Limit pie charts to 3-5 slices; never use distorted 3D charts.',
            'Clean charts prioritize clear titles and uncluttered axes over decorative graphics.'
          ],
          knowledgeCheck: [
            {
              id: 'kc_dat_4_1_1',
              questionText: 'Which chart type is most appropriate for visualizing the daily trend of orientation camp registrations over a 21-day period?',
              options: [
                'A 3D Pie Chart with 21 slices',
                'A Line Chart showing dates on the horizontal X-axis and registration counts on the vertical Y-axis',
                'A Scatter Plot with no axis labels',
                'A Radar Chart'
              ],
              correctAnswer: 1,
              explanation: 'Line charts are the optimal visual tool for displaying continuous chronological trends over time.'
            }
          ]
        },
        {
          lessonId: 'lesson_dat_4_2',
          moduleId: 'mod_dat_4',
          courseId: 'course_spreadsheet_mastery',
          title: 'Building Interactive Executive Dashboards in Google Sheets',
          sequence: 2,
          sequenceLabel: 'Lesson 4.2',
          estimatedDurationMinutes: 35,
          learningObjectiveIds: ['DAT-VIS-04'],
          introduction: 'Transform raw data into a decision-maker\'s dashboard. Learn how to design high-level KPI summary cards (Scorecards), layout charts neatly, and add interactive dropdown slicers.',
          lessonContent: [
            'What is an Executive Dashboard? A single-screen visual display of the most critical Key Performance Indicators (KPIs) needed to monitor operations and achieve objectives at a glance.',
            'Designing KPI Scorecard Cards: Large bold numbers displaying the vital metrics: Total Registrations (e.g. `1,420`), Qualifying Count (e.g. `850`), Overall Qualification Rate (e.g. `59.8%`), and Highest Platoon.',
            'Dashboard Layout & Visual Hierarchy: Place high-level KPI cards across the top; place major comparative charts in the center; place detailed tables at the bottom.',
            'Interactive Slicers (`Data → Add a slicer`): A floating interactive filter control that allows executives to click and filter the entire dashboard by State, Platoon, or Date without editing formulas.'
          ],
          nigerianContextExamples: [
            'Building a Camp Director Dashboard in Google Sheets showing real-time platoon quiz participation, daily registration velocity, and gender breakdown.',
            'An SME sales dashboard displaying Monthly Revenue, Top 5 Products, and Delivery Completion Rate.'
          ],
          practicalDemonstration: 'Demonstrate adding a Slicer in Google Sheets: Show how selecting "Platoon 5" instantly updates all charts and scorecard numbers on the dashboard simultaneously.',
          handsOnExercise: {
            title: 'Design a 1-Screen Executive KPI Dashboard',
            task: 'Construct a single-screen dashboard in Google Sheets with KPI scorecards, charts, and an interactive slicer.',
            steps: [
              'Create 3 top KPI Scorecard cards (Total, Qualifiers, Qual Rate).',
              'Insert 1 Bar Chart (Platoon performance) and 1 Line Chart.',
              'Add a Slicer control filtering by Platoon.',
              'Format with clean borders, consistent colors, and remove gridlines on the dashboard tab.'
            ],
            deliverable: 'A view-only share link to your 1-screen executive dashboard.'
          },
          keyTakeaways: [
            'Dashboards summarize critical operational KPIs on a single, uncluttered screen.',
            'Position high-level scorecards at the top and detailed charts below.',
            'Use interactive Slicers to empower non-technical decision-makers to filter reports dynamically.'
          ],
          knowledgeCheck: [
            {
              id: 'kc_dat_4_2_1',
              questionText: 'In Google Sheets dashboard design, what is an interactive "Slicer"?',
              options: [
                'A tool that permanently cuts out and deletes rows from your spreadsheet',
                'A floating interactive visual filter button that allows non-technical users to filter all connected charts and tables dynamically on screen',
                'A kitchen knife icon',
                'A formula that cuts numbers in half'
              ],
              correctAnswer: 1,
              explanation: 'Slicers provide user-friendly visual filter controls that let executives filter dashboard charts and tables on the fly without touching formulas.'
            }
          ]
        },
        {
          lessonId: 'lesson_dat_4_3',
          moduleId: 'mod_dat_4',
          courseId: 'course_spreadsheet_mastery',
          title: 'Data Storytelling and Communicating Insights to Stakeholders',
          sequence: 3,
          sequenceLabel: 'Lesson 4.3',
          estimatedDurationMinutes: 30,
          learningObjectiveIds: ['DAT-VIS-04'],
          introduction: 'Numbers without context are meaningless. Learn the art of data storytelling: translating complex statistical findings into actionable, evidence-based recommendations that convince leaders to take action.',
          lessonContent: [
            'The 3 Pillars of Data Storytelling: 1. Data (the empirical foundation); 2. Visuals (the clarifying lens); 3. Narrative (the context, human stakes, and call to action).',
            'Contextualizing Numbers: Instead of saying "Platoon 4 had 42 qualifiers", say: "Platoon 4 achieved the highest qualification velocity on camp, with 42 distinct qualifiers representing a 68% conversion rate—22% higher than the camp average."',
            'The Actionable Recommendation Framework: Every presentation must end with: 1. What the data showed; 2. Why it happened (root cause); 3. What action we recommend taking next, with projected ROI.',
            'Executive Briefing Etiquette: Executives have limited time. Start with the "Bottom Line Up Front" (BLUF) before diving into technical methodology.'
          ],
          nigerianContextExamples: [
            'Presenting an NYSC CDS healthcare outreach report to the Local Government Chairman: Showing that maternal health attendance rose by 35% following free malaria kit distribution, justifying a request for local council funding.',
            'Advising an SME owner to reallocate advertising budgets from Facebook to WhatsApp based on conversion data.'
          ],
          practicalDemonstration: 'Review an executive slide: Contrast a confusing raw data table with a crisp 1-sentence headline insight accompanied by a simple highlighted chart.',
          handsOnExercise: {
            title: 'Write a 1-Page Executive Data Story Brief',
            task: 'Translate a sample dataset into a concise 3-paragraph executive narrative with actionable recommendations.',
            steps: [
              'Paragraph 1: The Core Finding (The BLUF - Bottom Line Up Front).',
              'Paragraph 2: Supporting Data Points & Root Cause Analysis.',
              'Paragraph 3: Two Strategic, Actionable Recommendations with Expected Impact.'
            ],
            deliverable: 'Your completed 1-page Executive Data Brief.'
          },
          keyTakeaways: [
            'Data storytelling pairs quantitative proof with compelling human narrative and clear recommendations.',
            'Use the BLUF (Bottom Line Up Front) approach when briefing senior decision-makers.',
            'Frame insights around business outcomes and community impact, not just mathematical metrics.'
          ],
          knowledgeCheck: [
            {
              id: 'kc_dat_4_3_1',
              questionText: 'What is the "Bottom Line Up Front" (BLUF) methodology in executive data communication?',
              options: [
                'Hiding your main conclusion at the very bottom of a 100-page document',
                'Stating your primary finding, conclusion, and recommendation in the first two sentences so decision-makers understand the core takeaway immediately',
                'Refusing to show any numbers to the manager',
                'Speaking as quietly as possible'
              ],
              correctAnswer: 1,
              explanation: 'BLUF places the crucial conclusion and recommendation at the beginning of the briefing, respecting executive time and framing all subsequent data.'
            }
          ]
        }
      ]
    }
  ],
  capstoneProject: {
    title: 'Automated Small Business Financial & Operations Tracker',
    overview: 'Design, build, and deploy an automated digital revenue, expense, and operations tracker in Google Sheets for a small business, market cooperative, or school in your host community. The solution must feature tidy architecture, text cleaning formulas, dynamic lookups (XLOOKUP), multi-criteria aggregations (SUMIFS/COUNTIFS), and an interactive KPI dashboard with charts and slicers.',
    instructions: [
      'Step 1: Set up a 2-sheet workbook: Sheet 1 (`Transactions`) and Sheet 2 (`ExecutiveDashboard`).',
      'Step 2: On Sheet 1, establish tidy tabular architecture with at least 25 realistic transaction rows (Date, Item, Category, Units, Unit Price, Total, Payment Method).',
      'Step 3: Apply text cleaning (`=TRIM()`, `=PROPER()`) and Data Validation dropdowns.',
      'Step 4: Use `=XLOOKUP()` to match product pricing from a master price table.',
      'Step 5: On Sheet 2, build an Executive Dashboard containing 3 KPI Scorecards (Total Revenue, Total Profit, Average Order Value), 1 Bar Chart, 1 Line Chart, and an interactive Slicer.'
    ],
    assessmentCriteria: [
      'Tabular Architecture & Data Hygiene: Are tidy data rules applied with no merged cells and clean text formatting? (25%)',
      'Formula Sophistication: Are XLOOKUP, SUMIFS, and COUNTIFS used accurately with proper absolute/relative references? (25%)',
      'Dashboard Design & Interactivity: Are KPI cards, charts, and slicers well-organized, readable, and functional on a single screen? (25%)',
      'Data Storytelling & Real-World Utility: Does the solution solve an authentic operational challenge for an SME or school? (25%)'
    ],
    submissionGuidelines: 'Submit your project title, a 300-500 word summary explaining how the workbook operates, and a public view-only Google Sheets share link.'
  },
  finalAssessment: [
    {
      id: 'fa_dat_01',
      questionText: 'What is the primary difference between Quantitative and Qualitative data in analytics?',
      options: [
        'Quantitative data is measured in numbers and quantities, whereas Qualitative data describes categorical attributes and characteristics',
        'Quantitative data is only used in Nigeria, while Qualitative is international',
        'Qualitative data can only be typed in Microsoft Word',
        'There is no difference between the two terms'
      ],
      correctAnswer: 0,
      explanation: 'Quantitative data represents numerical measurements (e.g. scores, revenue), while qualitative data captures non-numerical qualities and classifications.',
      relatedLessonId: 'lesson_dat_1_1'
    },
    {
      id: 'fa_dat_02',
      questionText: 'Why do professional data analysts strictly avoid merging cells inside a data table?',
      options: [
        'Merged cells cause computers to overheat',
        'Merged cells corrupt tabular data architecture, preventing formulas, sorting, filtering, and pivot tables from reading rows correctly',
        'Merged cells turn all numbers into negative values',
        'Merged cells can only be opened on desktop computers'
      ],
      correctAnswer: 1,
      explanation: 'Merged cells break rectangular grid integrity, rendering automated formulas, multi-column sorting, and pivot table aggregation impossible.',
      relatedLessonId: 'lesson_dat_1_2'
    },
    {
      id: 'fa_dat_03',
      questionText: 'In a Google Sheets workbook with two tabs named "January" and "Summary", how do you reference cell B5 from the January tab inside a formula on the Summary tab?',
      options: [
        '`=January:B5`',
        '`=January!B5`',
        '`=January#B5`',
        '`=January@B5`'
      ],
      correctAnswer: 1,
      explanation: 'Cross-sheet references use the exclamation mark: `=SheetName!CellAddress` (e.g. `=January!B5`).',
      relatedLessonId: 'lesson_dat_1_3'
    },
    {
      id: 'fa_dat_04',
      questionText: 'What is the primary function of the `=TRIM()` formula in spreadsheets?',
      options: [
        'It deletes the entire row',
        'It removes all leading, trailing, and accidental multiple spaces from a text string',
        'It trims the cost of a project by 10%',
        'It shortens long words to five letters'
      ],
      correctAnswer: 1,
      explanation: '`=TRIM()` removes invisible extra spaces, ensuring that lookups and database matching algorithms function reliably.',
      relatedLessonId: 'lesson_dat_2_1'
    },
    {
      id: 'fa_dat_05',
      questionText: 'Which formula in Google Sheets will count how many participants in Platoon 3 (Column B) scored 6 or higher (Column C)?',
      options: [
        '`=SUMIF(B:B, 3, C:C, ">=6")`',
        '`=COUNTIFS(B:B, 3, C:C, ">=6")`',
        '`=AVERAGEIF(B:B, 3, C:C)`',
        '`=COUNT(B:B = 3 AND C:C >= 6)`'
      ],
      correctAnswer: 1,
      explanation: '`=COUNTIFS(B:B, 3, C:C, ">=6")` evaluates both criteria simultaneously: Platoon equals 3 AND score is greater than or equal to 6.',
      relatedLessonId: 'lesson_dat_2_2'
    },
    {
      id: 'fa_dat_06',
      questionText: 'What is a major advantage of `XLOOKUP` over legacy `VLOOKUP` in Google Sheets and Excel?',
      options: [
        '`XLOOKUP` can only look up words starting with the letter X',
        '`XLOOKUP` works in any direction (left or right), does not break when columns are added, and has built-in error handling',
        '`XLOOKUP` charges a monthly license fee',
        '`XLOOKUP` converts all numbers into text'
      ],
      correctAnswer: 1,
      explanation: '`XLOOKUP` is bidirectional, resilient to column shifts, defaults to exact match, and handles missing records without throwing `#N/A`.',
      relatedLessonId: 'lesson_dat_2_3'
    },
    {
      id: 'fa_dat_07',
      questionText: 'When auditing a participant quiz dataset where the maximum possible score is 10, you discover a row with a score of 100. What is this anomaly called?',
      options: [
        'A brilliant participant',
        'A data entry outlier or invalid range anomaly that must be flagged and corrected',
        'A normal random event',
        'A computer font error'
      ],
      correctAnswer: 1,
      explanation: 'A value of 100 on a 10-point scale is an invalid outlier resulting from a data entry error or formatting glitch.',
      relatedLessonId: 'lesson_dat_3_1'
    },
    {
      id: 'fa_dat_08',
      questionText: 'Why does Google Sheets or Excel turn a Nigerian phone number like `08110502600` into `8110502600` when you type it?',
      options: [
        'Because the phone number is invalid',
        'Spreadsheets treat unformatted numbers as mathematical values and automatically strip leading zeros; formatting the column as "Plain Text" prevents this',
        'Because telecommunication companies ban the number 0',
        'Because your internet connection was interrupted'
      ],
      correctAnswer: 1,
      explanation: 'In mathematics, leading zeros have no numerical value, so spreadsheets discard them unless the column is explicitly formatted as Plain Text.',
      relatedLessonId: 'lesson_dat_3_2'
    },
    {
      id: 'fa_dat_09',
      questionText: 'What is the primary benefit of using a Pivot Table in Google Sheets or Excel?',
      options: [
        'It changes the background color of your computer desktop',
        'It allows you to summarize, group, slice, and calculate averages or counts from thousands of rows of raw data in seconds without writing complex formulas',
        'It deletes half of your records to make the file lighter',
        'It turns spreadsheet text into spoken audio'
      ],
      correctAnswer: 1,
      explanation: 'Pivot tables are the industry standard for rapid exploratory analysis, aggregating voluminous data dynamically through drag-and-drop fields.',
      relatedLessonId: 'lesson_dat_3_3'
    },
    {
      id: 'fa_dat_10',
      questionText: 'Which chart type is most appropriate for visualizing the daily trend of orientation camp registrations over a 21-day period?',
      options: [
        'A 3D Pie Chart with 21 slices',
        'A Line Chart showing dates on the horizontal X-axis and registration counts on the vertical Y-axis',
        'A Scatter Plot with no axis labels',
        'A Radar Chart'
      ],
      correctAnswer: 1,
      explanation: 'Line charts are the optimal visual tool for displaying continuous chronological trends over time.',
      relatedLessonId: 'lesson_dat_4_1'
    },
    {
      id: 'fa_dat_11',
      questionText: 'In Google Sheets dashboard design, what is an interactive "Slicer"?',
      options: [
        'A tool that permanently cuts out and deletes rows from your spreadsheet',
        'A floating interactive visual filter button that allows non-technical users to filter all connected charts and tables dynamically on screen',
        'A kitchen knife icon',
        'A formula that cuts numbers in half'
      ],
      correctAnswer: 1,
      explanation: 'Slicers provide user-friendly visual filter controls that let executives filter dashboard charts and tables on the fly without touching formulas.',
      relatedLessonId: 'lesson_dat_4_2'
    },
    {
      id: 'fa_dat_12',
      questionText: 'What is the "Bottom Line Up Front" (BLUF) methodology in executive data communication?',
      options: [
        'Hiding your main conclusion at the very bottom of a 100-page document',
        'Stating your primary finding, conclusion, and recommendation in the first two sentences so decision-makers understand the core takeaway immediately',
        'Refusing to show any numbers to the manager',
        'Speaking as quietly as possible'
      ],
      correctAnswer: 1,
      explanation: 'BLUF places the crucial conclusion and recommendation at the beginning of the briefing, respecting executive time and framing all subsequent data.',
      relatedLessonId: 'lesson_dat_4_3'
    },
    {
      id: 'fa_dat_13',
      questionText: 'Which formula converts text in cell A1 into proper title case (e.g. converting "bello ibrahim" to "Bello Ibrahim")?',
      options: [
        '`=CAPITALIZE(A1)`',
        '`=PROPER(A1)`',
        '`=TITLE(A1)`',
        '`=CASE(A1)`'
      ],
      correctAnswer: 1,
      explanation: '`=PROPER()` capitalizes the first letter of each word in a text string while converting all other letters to lowercase.',
      relatedLessonId: 'lesson_dat_2_1'
    },
    {
      id: 'fa_dat_14',
      questionText: 'In statistical analysis, why is the Median often preferred over the Mean (Average) when analyzing salaries or revenue in Nigeria?',
      options: [
        'The Median is easier to spell',
        'The Median is resistant to extreme outliers (such as a few billionaire earners) which skew the Mean and paint an unrealistic picture',
        'The Mean is legally forbidden in financial reports',
        'Calculators cannot compute averages'
      ],
      correctAnswer: 1,
      explanation: 'The Median represents the true 50th percentile and is not distorted by extreme mathematical outliers, unlike the arithmetic Mean.',
      relatedLessonId: 'lesson_dat_3_3'
    },
    {
      id: 'fa_dat_15',
      questionText: 'What is the first argument required in a `=SUMIFS()` formula in Google Sheets?',
      options: [
        'The criteria range',
        'The sum_range (the numerical cells to be added together)',
        'The name of the worksheet',
        'The date of the calculation'
      ],
      correctAnswer: 1,
      explanation: 'Unlike `SUMIF`, the multi-criteria `SUMIFS` syntax places the `sum_range` as the very first argument, followed by criteria pairs.',
      relatedLessonId: 'lesson_dat_2_2'
    }
  ],
  completionCriteria: {
    requiredLessonsRatio: 1.0,
    requiredFinalAssessmentPassScore: 80,
    requireCapstoneSubmission: true
  }
};
