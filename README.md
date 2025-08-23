
# Getting Started

Requirement Doc - [tanmaygp@React-Native-assignment](https://www.notion.so/tanmaygp/React-Native-assignment-241afdc961ae80688bc6c4c31dd3b360)

This [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

### dependancies 
```json
dependencies: {
    "@react-native-async-storage/async-storage": "^2.2.0",
    "@react-native/new-app-screen": "0.81.0",
    "@react-navigation/elements": "^2.6.3",
    "@react-navigation/native": "^7.1.17",
    "@react-navigation/native-stack": "^7.3.25",
    "@shopify/flash-list": "^2.0.3",
    "@types/axios": "^0.9.36",
    "axios": "^1.11.0",
    "react": "19.1.0",
    "react-native": "0.81.0",
    "react-native-reanimated": "^4.0.2",
    "react-native-safe-area-context": "^5.6.0",
    "react-native-screens": "^4.14.1",
    "react-native-video": "^6.16.1",
    "react-native-worklets": "^0.4.1",
    "rxjs": "^7.8.2"
}
```

# Overview of the Project Implementation.
We have started with an empty React-Native application with the following steps -
```sh
# Creation of Empty React-Native Project with new arch.

npx @react-native-community/cli --init <project-name>  
```

The project name parsed here was `assessment250814` here.

Once the project is created, we have built the black default project with the following commands - 

```sh
# cmd to verify the React-Native readyness on a machine.
npx react-native doctor

# commands to run iOS Debug and Release variants respectively.
npx react-native run-ios
npx react-native run-ios --mode=Release

# commands to run Android Debug and Release variants respectively.
npx react-native run-android
npx react-native run-android --mode=Release
```

Once verified the setup, we have started writing the `Project Architecture`.

<br/>

# Project Architecture
Following the MVI-based pattern, we have defined the following secondary directories to build and manage the project:

```md
assessment250814/
├   
├── App.tsx
├
├── src/
├   ├
├   ├── constants/      (To store Global Constants or local configs) 
├   ├
├   ├── foundation/     (The core components, defines the project structure)
├   ├
├   ├── models/         (Package to store the data models)
├   ├
├   ├── navigation/     (App-wide Navigation would be defined here)
├   ├
├   ├── services/       (Primary data providers for remote and cached data sources)
├   ├
├   ├── views/          (the front-end layer includes screens, vms and components)
├   
```


## Role of `views/` directory
This is the main directory that modularizes the application into a set of small, easy-to-manage components based on UI requirements and MVI data flow standards.

This directory contains the following subdirectories:

```md
views/
├   
├── components/
├   ├
├   screens/
├   ├
├   ├── HomeFeed/
├   ├   ├
├   ├   ├── ui/
├   ├   ├   ├
├   ├   ├   ├── HomeFeedSuccessUi.tsx
├   ├   ├
├   ├   ├── _layout.tsx
├   ├   ├
├   ├   ├── HomeFeedUiEvent.ts
├   ├   ├
├   ├   ├── HomeFeedUiState.ts
├   ├   ├
├   ├   ├── HomeFeedViewModel.ts
├   ├   ├
├   ├── MediaGallery/
├   ├   ├
├   ├   ├── _layout.tsx
├   ├
├   ├── ...
├   ├
├   ├── ...
.   .
.   .
.   .
```

The architecture wraps all necessary MVI components into subdirectories, so that if required, a specific module can be replaced independently by a newer version without causing regressions.

Abbs - MVI: Model-View-Intent the modern client-side app architecture.

## Creation of the `models/` and `services/`

Once architectural setup done, we have created the shared data repository that is supposed to provide the data wrapped into a Data Transfer Object from `Models/` directory, from the remote as well as the cached data sources.

The directory that contains the data-providers code is `services/`.
```md
models/
├   ├
├   ├── CollectionDTO.ts
├   
services/
├   
├── api/
├   ├
├   ├── APIConfig.ts            (file carries the baseUrl and Auth info)
├   ├
├   ├── MediaAPI.ts             (api service, help to fetch remote data)
├   
├── cache/
├   ├
├   ├── MediaCache.ts           (cache service, help to set and get)
├   
├── sharing/
├   ├
├   ├── DataRepository.ts       (the common repo, fetches data from remote and cache)
├   ├
├   ├── ResponseCategory.ts     (wrapper around the state of Data)
├
```

While writing the UI, we basically required a BaseViewModel, so that all the viewmodels in the app follow a common pattern, that thought lead to the creation of `foundation/` directly, in that we simpy have our MVI-arch VM named - `MVIViewModel.ts`.

## Creation of `navigation/` directory
The App level navigation directory, may or may not contain all the internal screen routes, as we are modularizing the code, so internal navigation pages or screen like tab navigation may be defined inside the respective sub-module in `views/screen/<root-screen-name>/` directory.
```md
navigation/
├   
├── AppNavGraph.tsx     (defines the App Navigation Graph)
├   
├── NavigationProps.ts  (defines the listed routes and props)
├ 
```

Once data was here, we have completed the `HomeFeed Screen` followed by `Media Gallery`, with all neccessary Intents, States and Helpers. 

<br/>

# Instructions to run the app

> [!NOTE]
> Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.


## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start --reset-cache
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npx react-native run-android --mode=release
```

### iOS

> [!IMPORTANT]
> For iOS, remember to install `CocoaPods` dependencies.

run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npx react-native run-ios --mode=Release
```

If everything is set up correctly, you should see the app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

### Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

---

# Media handling
The Application contains two types of media `Photos` and `Videos`, on two primary locations `HomeFeed` and `MediaGallery`.

## Autoplay Solutioning (Video in HomeFeed)
The root layout on the HomeFeed is a Lazy loading supported list, renders the components based on their type and dimensions.

A video item as a child, load both a thumbnail image while item is off-focus, and a video player, when item gains the focus into the UI.

As we may see, we can have various edge-cases where video player of one item may conflict or overlap with another playback item into the list. To prevent this happening we wanted an atomic unit to decide which item to enable playback for.

For this we are using a number, the number that carries the `index` of an media item into the dataset.

The value of this item is defined based on the top-most video element into the list of visible items on the screen in a single snippet.

The `playbackIndex` index as it is parsed to all the list items where the child itself decides to play the video or just keep showing the thumbnail. If playback triggered, the thumbnail hides as soon as player starts the playback.

To make sure the list do not stutter while scrolling, we make sure to release the player item as soon as it pauses, also we load `sd` quality media only, to prevent over-saturation of hardware intensive resources.

## High Density Media Playback (Video in MediaGallery)
Since Gallery is the Pager layout based UI, selecting the `playbackIndex` is way more easy, where we just need to enable the playback for the `currentItemIndex`.

Here, since the solutioning same, with no posibility of multiple video items on the list, we have set the playback quality to max supporting `uhd` formate by default.

### Playback Error and Retry
We in the gallery page, retries a failed video intialization with the fallback URLs, where in the first retry we switch from `uhd -> hd` quality, and it that too fails, the url changes to `hd -> sd`, the same quality we are initializing the playback for.

## Poster Listing (Photos in HomeFeed)
As per the research and the suggestions too, the react FastImage was a better option as per the performance, but the latest version of that library doesn't match the new architecture, so till we would stay with the RNC-Image component for Image rendering and caching.

## Zoomable ImageView (Photos in MediaGallery)
**[WIP]** The remaining part for the development, where the high resolution image that we have rendered into the gallery would let the user interact with the details it carries.

# performance techniques
## Pagination
The paginated API allowed us to minimize the load on the UI with limited set of data (15 items) per page, loads as we consume further.

We have written an MVI based solution for pagination, that triggers the next_page API, 3 items before the user reaches to the end of the list.

## Use of FlashList from @Shopify
The flashlist SDK is based on the native components of Android and iOS platforms, reaching the performance of native apps, the layout helped us to build both the HomeFeed and the PagerGallery.

We made use of all the suggested optimisation technics to touch the hights of UX excellence.

## Selective Media Playback
Atomic index for a playback item, made the scroll exprience smooth by minimizing the number of video players on the screen.

## Re-Animated Bundle for Animations
As suggested and mentioned in the requirement docs too, the re-animated SDK that runs on the core C++ NDK based bridging suited out requirements.

We used this librabry to resolve the snappy image to player transition and vice-versa.

## Use of native Player SDK
We are making use of `react-native-video` player SDK, that promised the implementation of platform specific, well optimised native players like ExoPlayer on android.

## RxJS for data channels
Since we find it hard to switch to the non-ui threads, reactive programming was the prominant solution for multithreading.

While the main UI thread will only takes the responsibility of user interections and intent collections, back-channel the entire data flow and intent handling is implemented using RxJS component, involving auxilary threads into action.

## Optimized navigation using enableScreens()
A call to `enableScreens()` function from `react-native-screens` was an GPT suggested solution for navigation optimisation, and it really worked by making the screen to screen transion buttery smooth.

<br/>

# List of challenges while building the App
`React-Native` as a technology itself was very much new for me, but since the learning curve was smooth and I already have exprience working with framework like `Flutter`, leaning the tech-stack and understanding the terms was not that hard though, but while implementing the components into a project, we have faced following challanges - 

## Dealing with the glitches around System Bars and Window Insets
The most of the time I spent was dealing with the system bars on android platfrom itself.

While the HomeFeed is only a portrait screen, we enabled auto-rotate on `MediaGallery`, on one handle it improved the UX when horizontal `16:9` content is consumed, keeping the layout intact, was a change specilly when a list layout is used instead of a pager.

Dynamic item sizes on android with everything working well and good on iOS was a challenge to fix thing without any regression.

## Leaning curve of `Redux` with `Saga` was steep
As redux is the prominant and widely used solution for `Flutter`, I have started leaning it with React-Native too, but it was hard to pick specially with limited timeline, the state collection part of centeral reducers and blacking of Saga, left me low confident using the same on this project.

## Data State Management and Transmission to the UI
Since Redux was not the go ahead, we built our own solution to manage the states with the help of RxJS components, although it was not as simple as I though it would be, we resolve the data parsing glitches and the repeatative Intent firing flow from UI, and optimized the solution to match the Native App architectural solutioning.

## RNC-`PagerView` performance issues
Spending the entire day trying to minimise the compositions on RNC-`PagerView` we have decided to look for the alternative solutioning for the Pager layout, ending up converting the `FlashList` itself to a Pager Layout.

## Unabled to switch the threads like `coroutines`
For a person, who is used-to with the native development, it's hard to
work without that tool-kit, we loses most of the components like Lifecycle and Coroutines, where our entire data grows, processes and cooks on the `IO` and `Default` threads only, 

<br/>

# Demo Video and Images

iOS - https://drive.google.com/file/d/1Z-N3H16QGHt1P_fM0GGtz8d-E4h4HJSd/view?usp=drive_web

Android - TBA

## Learn More (React-Native default)

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
