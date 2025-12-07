# Student template

## Purpose of this repository

This is a project template for students participating in Software Testing course
at LAB University of Applied Sciences.

The repository only contains the source code that is under testing, `package.json` skeleton
and LICENSE file.

Source code folder contains a separate license file that must **NOT** be removed under any circumstances!
Removing this license file directly violates terms and conditions of the software under testing.
Individuals who remove or modify the license file will also carry the consequences.

## Testing

- Tests are written with Mocha and Chai under `test/` and only cover modules in `src/` (the internal helpers in `src/.internal` are intentionally excluded).
- Run the suite with `npm test`.
- Generate a coverage report with `npm run coverage`; c8 is configured to focus on `src/` and produces a text summary plus an lcov report.
- The current suite sits around 93% line coverage.
