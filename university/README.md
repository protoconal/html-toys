# University Program Picker
This is a static Angular app that uses Material components.

It grabs details from a list of scrapped University Programs to display Card-Like objects. 
These Card-Like objects can be manipulated through Drag-And-Drop, changing the order and list they exist within.

## Features
You can...
 - save and load the existing ids being displayed in each list.
 - request a certain range of programs to be displayed.
 - add n number of programs to be displayed.
 - look at that program counter that shows how many are being displayed!

#### App can be found hosted [here](https://tony01230.github.io/html-toys/university/index.html)

## How to add your additions
 - More Icons! You can add more University Icons!
1. Find your icon, ensure it is centred or circular.
2. Put the icon under ./assets/img/ , keep in mind the name of the file.
3. Open ./listing.json in the same folder and append to the end of the first dictionary, "the exact name of university": "filename". 
4. Keep in mind to respect JSON formatting rules.
   
 - More Programs!
1. Find your list of programs. The minimum required information and dictionary format for each program is this...
```
{"name": "Program Name", "institution": "University", "education": "Required Mininmum Education",
"credential": "I.e. Diploma", "coop": "Yes or No", "tuition-canadian": "$3,741 for 1 year(s) - can be custom", 

"course-req": ["Any High School Requirements", "In List"]}
```
2. Put it into a list and save as a JSON file.
3. Replace ./assets/listing.json

 - More datapoints!

Because of the flexible nature of Angular's template system. To change the displayed requirements and add your own information to each card, 
you can edit the template for one and then copy and paste replace it for the rest! Just follow the accessing structure of a dictionary and 
you'll be fine, provided that the information is contained within the program's dictionary details.

##### [Download compiled version.](./dist)
##### [Navigate to the source code!](./source) p.s., I haven't uploaded it yet.

## Notes
 - A weird quirk caused by how I asked Angular to render each card is that each list component "shadows" the main listing of programs.
 > Instead of transferring the actual details, the index of the program in the main listing gets transferred. And because of that, 
 > I think that Angular is forced to look up the details again which is an inefficiency that grows with the number of programs required to transfer.
 - I can't display Card internal components without a card instantiation.
 > It makes sense that it doesn't let me do that but, why not?
 - Styling of CSS can be improved.
 > Needs more min-widths and spacing between items in the toolbar. You can probably set that card to a display: none; and it would work.
 - This is the first Angular you've created.
 > I kNoW bUt It LoOks LiKe GaRbAgE. And you've spent too much time on it. 
 > 
 > *Thanks man.*
