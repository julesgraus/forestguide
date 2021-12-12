# Forest Guide

<p align="center">
<a href="https://travis-ci.com/julesgraus/forestguide"><img src="https://travis-ci.com/julesgraus/forestguide.svg?branch=master" alt="Build Status"></a>
<a href='https://coveralls.io/github/julesgraus/forestguide'><img src='https://coveralls.io/repos/github/julesgraus/forestguide/badge.svg' alt='Coverage Status' /></a>
<a href="https://www.npmjs.com/package/forestguide"><img src="https://img.shields.io/npm/dt/forestguide" alt="Total Downloads"></a>
<a href="https://www.npmjs.com/package/forestguide"><img src="https://img.shields.io/npm/v/forestguide" alt="Latest Stable Version"></a>
<a href="https://www.npmjs.com/package/forestguide"><img src="https://img.shields.io/npm/l/forestguide" alt="License"></a>
</p>

Guiding your users trough your web app.

It can detect certain html elements you choose, like buttons, and transform them into
special buttons. When you click those buttons, a sound file you have chosen will be played.
This sound fragment MUST explain what the users see on their screen. And MAY also explain how
they can interact with your web app.

While the sound is playing, it may also execute certain actions at times you specify. 
Like scrolling to an element. And maybe and adding a class to that element, emphasising it, so
that your users know what you are talking about. So in essence, guiding your users trough your
web app.

* [License](#license)
  + [Installation](#installation)
  + [Keywords to indicate requirement levels](#keywords-to-indicate-requirement-levels)
  + [Integration](#integration)
  + [Understanding guides](#understanding-guides)
    - [Structure](#structure)
      * [Root](#root)
      * [Cue objects](#cue-objects)
      * [Action objects](#action-objects)
      * [Guide example](#guide-example)
  + [Actions](#actions)
    - [AddClass](#addclass)
      * [What it does](#what-it-does)
      * [Options object](#options-object)
    - [ScrollToElement](#scrolltoelement)
      * [What it does](#what-it-does-1)
      * [Options object](#options-object-1)
    - [ClosedCaption](#closedcaption)
      * [What it does](#what-it-does-2)
      * [Options object](#options-object-2)
  + [Configuration options](#configuration-options)
  + [rootUrl property](#rooturl-property)
  + [loadingClass and playing properties](#loadingclass-and-playing-properties)
  + [presenceNotification properties](#presencenotification-properties)
  + [Default css](#default-css)
    - [addClass action](#addclass-action)
    - [closed caption action](#closed-caption-action)
* [Thanks!](#thanks-)

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Installation

You can install forest guide via npm:

```
npm install forestguide
```

### Keywords to indicate requirement levels
This readme contains keywords that indicate certain requirement levels, as described in [RFC2119](https://www.ietf.org/rfc/rfc2119.txt)

### Integration

You must include 1 javascript file and may include a css file with default styling:

1. Find the forest guide dist directory:
    * If you installed Forest Guide with npm, the root directory is node_modules/forestguide/dist.
    * If you downloaded the project on github, the root directory is the dist directory.
2. Include the both forestguide.css and forestguide.js from the dist directoy into your project.
When you use npm, just reference it in the node_modules folder. Don't copy it to somewhere else.
3. In your document root folder (public_html, htdocs etc), create a folder and note its name. 
In this folder you later put audio files and json files that guide your users. 
From now on, we call this the **resource folder**.
4. Initialize forest guide by creating and configuring a new instance in your javascript code like below.
The root url is the name of the **resource folder**.
    ```
    new ForestGuide({
        "rootUrl": '/forestguide/',
    });
    ```
5. Create HTMLElements like button's users can press on, and give them a "data-forest-guide" attribute
with the name of a guide (without .json and path). When users press it, that guide wil be loaded and played.
6. Now you are ready to create a guide and let that guide users trough your app.

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

#### ClosedCaption
##### What it does
The ClosedCaption action show a closed caption on the bottom or top of the screen. And removes it when it deactivates.
The name of the action in an action object must be "cc" or "closed_caption"". 

##### Options object
The options object MUST have a "text" property that MUST be a string. This will be the text that will be displayed
when the action activates.

It MAY also have a "wrapperClass" property that MUST be a string. The value of the "wrapperClass" property MUST be the 
name of a css class. The HTMLElement that will have this class applied must wrap a p tag that will be filled when 
subtitles must be shown. If you don't specify it, it will default to a value of "fg-closed-caption". 
This class is defined in the default css that is included.

### Configuration options
The configuration options you pass in as an object into a forest guide instance, allow you to customize most of it's
settings.

### rootUrl property
In this is the path part of an url, that will reference a folder in which you put the audio and guide files forest guide
can us.

### loadingClass and playing properties
These classes respectively will be added to "buttons" which start / stop guides when a guide is loading or playing.
This allows you to add your own styling to the buttons depending on their state. They respectively have the default 
values of "loading" and "playing".

### presenceNotification properties
Usage of this functionality is optional and if you don't specify it's options, this function will not be used / active.
"presenceNotificationSelector" MAY reference an HTMLElement that tells the user about the presence of forest guide, 
and how they get started with it. It's default value is ".fgPresenceNotification". Users MUST be able to close 
that notification using a close button with a class as defined with the "presenceNotificationCloseButtonSelector" property. 
That defaults to a value of ".close". A value of property "presenceNotificationClassToRemove" MUST be a class name that 
MUST be removed to make the notification visible when the user MUST be notified. If you don't specify it, it won't be used.
A value of property "presenceNotificationClassToAdd" MUST be a class name that 
MUST be added to make the notification visible when the user MUST be notified. If you don't specify it, it won't be used.
The value's of properties "presenceNotificationCloseClassToRemove" and "presenceNotificationCloseClassToAdd" can be used to
respectively remove and / or add a class from / to the notification element to make that element be hidden. Just to make it seem
closed. If you don't specify them, the notification will be removed from the DOM when the user closes the notification.

The easiest way to use these properties is to make your notification invisible by default using a class. 
And specify the "presenceNotificationSelector" and "presenceNotificationClassToRemove" properties. The first one
to tell forest guide which element represents the notification and the second one to tell it which class it must remove
to make the notification visible.

### Default css
The default css file includes some default styling you can use.
You are free to use your own styles as you can override the defaults.

#### addClass action
It has 2 classes. "fg-blink-border", that is used by default. 
And the "fg-blink-background" class. The first one, slowly
blinks the border of an element red. And the second slowly blinks the
background of the element a bit red.

#### closed caption action
It has a class called "fg-closed-caption". This class is meant for a wrapper
class that wraps a p tag that will contain the subtitle text. And it will get
either an extra class called "bottom" or "top" applied automatically to diplay the
subtitle on the bottom or top of the screen

## Thanks!
Thanks for your interest in this project! Jules.
