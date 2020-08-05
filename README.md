# EPAM NodeJs metoring program

## Home task 1

### Task 1

Write a program which reads a string from the standard input `stdin`, reverses it and then writes it to the standard output `stdout`.
* The program should be started from npmscript via nodemon.
* The program should be running in a stand-by mode and should not be terminated after the first-stringprocessing.

**Solution:** To run the command use `npm run task1`

### Task 2

Write a program which should do the following:
* Read the content of csvfile from `./csv` directory. Example: https://epa.ms/nodejs19-hw1-ex1
* Use the `csvtojson` package (https://github.com/Keyang/node-csvtojson) to convert csv file to json object.
* Write the csvfile content to a new txtfile. Use the following format: https://epa.ms/nodejs19-hw1-ex2.
* Do not load all the content of the csv file into RAM via stream (read/write file content line by line).
* In case of read/write errors, log them in the console.
* The program should be started via npm script using nodemon.

**Solution:** To run the command use `npm run task2`
