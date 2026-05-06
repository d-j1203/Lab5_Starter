# Lab 5 - Starter
https://d-j1203.github.io/Lab5_Starter/expose.html

Daniel John

1. No, a unit test would not be appropriate for the "message" feature. Sending a message between users involves many moving parts working together — capturing input from the sender, validating it, transmitting it over the network, storing it on a server, and delivering it to the recipient's client. Unit tests are designed to test individual, isolated pieces of code.
2. Yes, a unit test is well-suited for the "max message length" feature. The logic here is small, self-contained, and has a clear input-output relationship: given a string, decide whether it exceeds 80 characters and reject it if so.
