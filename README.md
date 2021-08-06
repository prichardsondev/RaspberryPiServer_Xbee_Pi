## **IoT Server: Raspberry Pi <-Xbee-> Arduino**

---

<img src="./img/xbee.png" width="400"/>
<img src="./img/arduino.png" width="400"/>

---
### Arduino code link below
https://github.com/prichardsondev/RaspberryPiServer_Xbee_Arduino <br />
    
### Description
Communication between Raspberry Pi and Arduino using Xbee Radios <br/>
- Editor used: VS Code with Platformio <br/>
- Raspberry Pi: Nodejs/Express/Socket.io <br/>
- Arduino (Router): C++ <br/>
- Serial Communication: Xbee radios in API mode

Code is broken down into modules and classes for a cleaner application <br/>
that's easier to scale (make bigger) <br/>

Xbee libraries are used in Rasbperry Pi and Arduino to make communication <br/>
simpler. Pure serial packets are built where libraries didn't work for me

Helpful to have a basic understanding of the following - but not necessary. Just <br>
watch the video below and wing it as you learn <br/>
- Xbee Radios and how they communicate in API mode with Coordinator and Router
- Nodejs/Javascript
- C++

If you wanted to just connect an Arduino directly to a Raspberry Pi you could <br/>
use the same code - it's still serial communication. Just need to remove the xbee stuff <br/>

Code by no-means is perfect - I welcome any input

---

### Video Overview
https://www.youtube.com/watch?v=zoc-5arh9Yg&list=PLlnL61QfD9UbcGw8Oxz-KtOhbSqJ4oTW1


---

### Hardware:
- Raspberry Pi 3 or 4
- Arduino Uno/Mega/other
- 2 Xbee radios S2 or S3
- Xbee explorer USB / Xbee breadboard explorer
- Breadboads/Wires/LEDs
- RGB LEDs - I'm using WS2812B
  
---

#### To run:

- cd RaspberryPiServer_Xbee_Pi

- npm install

- src/radios/bench.js
  - add address of router radio (lowercase)
  - this is the radio attached to your arduino
  
- connect Coordinator radio to USB port
  - note you many have to edit port top of /src/serial/xbeeSerial.js
  - at terminal type ls /dev/tty* to check your xbee port

- npm start


  


