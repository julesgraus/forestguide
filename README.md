# Forest Guide

Guiding your users trough your web app.

It can detect certain html elements you choose, like buttons, and transform them into
special buttons. When you click those buttons, a sound file you have chosen will be played.
This sound fragment MUST explain what the users see on their screen. And MAY also explain how
they can interact with your web app.

While the sound is playing, it may also execute certain actions at times you specify. 
Like scrolling to an element. And maybe and adding a class to that element, emphasising it, so
that your users know what you are talking about. So in essence, guiding your users to your
web app.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Installation

You can install Forest guide via Yarn:

```
yarn add forestguide --ignore-engines
```

### Keywords to indicate requirement levels
This readme contains keywords that indicate certain requirement levels, as described in [RFC2119](https://www.ietf.org/rfc/rfc2119.txt)

### Integration

You must include 1 javascript file and may include a css file with default styling:

1. Find the forest guide dist directory:
    * If you installed Forest Guide with yarn, the root directory is node_modules/forestguide/dist.
    * If you downloaded the project on github, the root directory is the dist directory.
2. Include the both forestguide.css and forestguide.js from the dist directoy into your project.
When you use yarn, just reference it in the node_modules folder. Don't copy it to somewhere else.
3. In your document root folder (public_html, htdocs etc), create a folder and note its name. 
In this folder you later put audio files and json files that guide your users. 
From now on, we call this the **resource folder**.
4. Initialize forest guide by creating and configuring a new instance in your javascript code like below.
The root url is the name of the **resource folder**.
    ```
    new ForestGuide({
        "rootUrl": 'forestguide/',
    });
    ```
5. Now you are ready to create a guide and let that guide users to your app.

### Understanding guides

Guides, and their accompanying sound files, reside in the **resource folder**. They contain the data that will guide the users.

#### Structure

Before you can create a guide, you MUST understand it's structure:
##### Root
The root of a guide MUST contain two properties: soundFile and cues. The soundFile property MUST be a string,
referencing to a sound file relative to the ***resource folder***. The cues property MUST be an array, containing cue objects. For example:
```
{
  "soundFile": "dashboard.mp3",
  "cues": [
  ]
}
```
##### Cue objects
A cue object describes a time frame in which certain actions must occur. And MAY have action objects that describe what must happen.
At the root of a cue object MAY be a comment property that MUST hold a string. 
The comment property is intended to be a reminder for the writer of the guide, describing what the cue is for.

At the root of a cue object there also MUST be both a start and end property. Both MUST be a number in seconds.
The start property MUST be a number, indicating a position in the sound file, on which you want to start / activate the
actions of the cue. The end property MUST indicate a position on which you would stop / deactivate the actions.

There also MUST be a actions property at the root of a cue object. This actions property MUST be an array of action objects.
An example cue object looks like this:
```
{
  "comment": "Show the news section",
  "start": 2,
  "end": 5,
  "actions": [
  ]
},
```

##### Action objects
An action object describes a certain action that must be executed within the timeframe the cue it belongs to specifies.

At the root of the action object there MUST be a name property. This name property must be a string. And must be one
of the action names you will find further in this guide. At the root of the action object there also MUST be an options property.
This options property is different for each action. See the action of your choice to see how you need to define it.
An example action object looks like this:
```
{
  "name": "scrollToElement",
  "options": {
  }
}
```

##### Guide example
A complete guide MAY look like this:
```
{
  "soundFile": "dashboard.mp3",
  "cues": [
    {
      "comment": "Show the news section",
      "start": 2,
      "end": 5,
      "actions": [
        {
          "name": "addClass",
          "options": {
            "selector": "#news"
          }
        }
      ]
    },
    {
      "comment": "Show the settings section",
      "start": 2,
      "end": 5,
      "actions": [
        {
          "name": "addClass",
          "options": {
            "selector": "#settings"
          }
        },
        {
          "name": "scrollToElement",
          "options": {
            "selector": "#settings"
          }
        }
      ]
    }
  ]
}
```

### Actions
Actions ***activate*** when the audio file's playing position hits the start time of the cue in which the action was referenced.
And they ***deactivate*** when the audio is either paused or the end time of the cue is reached. The action names as
referenced in action objects are case insensitive.

#### AddClass
##### What it does
The AddClass action adds a class to a given element when the action activates. And removes that class when it deactivates.
The name of the action in an action object must be "AddClass". 

##### Options object
The options object MUST have a "selector" property that MUST be a string. The value of the "selector" property MUST be
one or more css selectors, separated by comma's. These selectors refer to elements you want to add the class to.

It MAY also have a "class" property that MUST be a string. The value of the "class" property MUST be the name of a css class.
this will be the class that is added when the action activates. And be removed when it deactivates. If you don't
specify it, it will default to a value of "fg-blink-border". This class is defined in the default css that is included.
This class will make the border fade in and out in a red color.

#### ScrollToElement
##### What it does
The ScrollToElement action scrolls the browser view so that a predefined element is visible when the action activates.
When the action deactivates, nothing happens.

##### Options object
The options object MUST have a "selector" property that MUST be a string. The value of the "selector" property must be a
single css selector that references to the element that you want to scroll to.

The options object MAY have a property called "behaviour" that MUST be a string. It's value defaults to "smooth" which means,
that in most browsers (except Internet explorer) the scrolling smoothly visible. The alternative value can be "auto", 
which usually means that you don't scroll to the element, but instantaneously have it in your view. It jumps to it.

The options object MAY have a property called "horizontal_alignment" that must be a string property. It's value must 
be one of these: "start", "center", "end", "nearest". These determine where in your browser view the element wil be scrolled to.
Its value defaults to "nearest" when not specified.

Thee also MAY be a property called "vertical_alignment" that works the same as horizontal alignment. But as the name
suggests, vertically. Its value defaults to "center" when not specified.

### Default css
The default css file includes two classes, that you can use for the
addClass action. "fg-blink-border", that is used by default for the
addClass action. And the "fg-blink-background". The first one, slowly
blinks the border of an element red. And the second slowly blinks the
background of the element a bit red.

You are free to use your own styles as you can override the defaults.


##Thanks!
Thanks for your interest in this project! Jules.