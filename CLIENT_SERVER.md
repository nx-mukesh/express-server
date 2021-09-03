# Client:

    When we talk the word Client, it mean to talk of a person or an organization using a particular service. Similarly in the digital world a Client is a computer (Host) i.e. capable of receiving information or using a particular service from the service providers (Servers).

# Servers:

    Similarly, when we talk the word Servers, It mean a person or medium that serves something. Similarly in this digital world a Server is a remote computer which provides information (data) or access to particular services.

User enters the URL(Uniform Resource Locator) of the website or file. The Browser then requests the DNS(DOMAIN NAME SYSTEM) Server. 
1. DNS Server lookup for the address of the WEB Server. 
2. DNS Server responds with the IP address of the WEB Server. 
3. Browser sends over an HTTP/HTTPS request to WEB Server’s IP (provided by DNS server). 
4. Server sends over the necessary files of the website. 
5. Browser then renders the files and the website is displayed. This rendering is done with the help of DOM (Document Object Model) interpreter, CSS interpreter and JS Engine collectively known as the JIT or (Just in Time) Compilers.

### Advantages of Client-Server model:

1. Centralized system with all data in a single place.
   Cost efficient requires less maintenance cost and Data recovery is possible.

2. The capacity of the Client and Servers can be changed separately.

### Disadvantages of Client-Server model:

1. Clients are prone to viruses, Trojans and worms if present in the Server or uploaded into the Server.

2. Server are prone to Denial of Service (DOS) attacks.
3. Data packets may be spoofed or modified during transmission.
4. Phishing or capturing login credentials or other useful information of the user are common and MITM(Man in the Middle) attacks are common.
