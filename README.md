Link to Behance Presentation:  https://www.behance.net/gallery/84534493/Giftwrap-UIUX-App-Development

Motivation
As your friend’s birthday draws closer, you find yourself struggling to get just the right gift for that person. Unfortunately, our busy lives often leave not much time to look for the right gift, and our hectic schedules forces us to do last-minute shopping when we only remember the date all too near. And there’s nothing more discouraging than the disappointed looks on their face after receiving an uninspired gift. 

That being said, it would be good to have something that would eliminate uncertainty when it comes to buying gifts for your friends and family during various special occasions (e.g. Christmas, Mother’s Day, weddings, etc.). This would avoid such disappointment from your loved ones by getting them the gifts they want the most. Conversely, your friends and family can do this for you!

Aim
We hope to design an application that marries the concept of having a wishlist that can be viewed by others and an organiser of events and their corresponding gits.

User Stories
As a person whose loved one’s special occasion draws closer, I want to be able to have ample time to shop for their perfect gift.
As a person whose loved one’s special occasion draws closer, I want to get my loved one something for them that I know they would enjoy and appreciate.
As a rational user, I want to be able to receive gifts that I know I will enjoy.
As a user who has hectic daily schedules, I want to able to organise my events and keep track of the gits I want to get for others.
As a user who frequents e-commerce platforms, I want to be able to easily add items to my wishlist for others to view.

Scope of Project
The Wishlist App provides a list interface for users to add their desired gifts to the wishlist as well as allow others to view their wishlist, and an organiser of events with the corresponding gifts the user has decided to prepare for their loved ones.

The App Extension will utilize the shared action provider(on Android) to allow the user to easily add gifts to their wishlist from the e-commerce platform Lazada. 

Updates from Milestone 2 
Core Features Developed
1. Users are able to sign into Giftwrap using Facebook Login
This allows us to obtain information from the user and the user’s friends (who must have also authorized our app). This primarily consists of data such as their email, name, Facebook profile photo as well their userID (which is used for tracking their information when storing in Giftwrap’s firebase console).

2. Users are able to utilise wishlist CRUD and storage function
Users are able to create their own wishes (gifts they want) and store it in firebase, where it is tied to their unique Facebook ID. Due to Firebase’s realtime database, these gifts can be deleted and updated, and these changes will reflect in real time on their screen.

3. Users can view the wishlists of their Facebook friends
As long as the corresponding friend also authorizes the Giftwrap app, the user will be able to view a list of his friends who also use the app, and access the wishlist of that particular friend.

4. Users are able to add gift ideas for their loved ones to their organiser manually
Users are able to save gift ideas where it will be stored in Firebase and tied to their Facebook user ID. These gift ideas will be stored with the following fields: gift idea, recipient, intended price of gift and event user plans to gift.

Problems Encountered
1. Attempting to integrate Facebook into Giftwrap
Our team originally faced much trouble trying to integrate Facebook login into our app. We went through numerous tutorials attempting to create a sample Facebook application but none were successful. This was because we had to integrate Facebook login with Firebase authentication, but the tutorials we found earlier were either outdated or only taught one without the other. 

After extensive research, we finally found a tutorial which provided missing links throughout all previous tutorials we tried before. This tutorial provided insight on how we could integrate the code into our existing app using react native firebase that could make Firebase integration easier. Thus, it gave us a better idea of how the code worked and allowed us to create a successful Facebook sample app.

After which, we were able to translate what we learnt into our app to successfully allow Facebook login to authenticate the user when he signs into our app.

2. Utilising Facebook’s Graph API to obtain information on the user’s Facebook friends
Upon preliminary research, we encountered issues as we learnt that the edge that returns information on the user’s Facebook friends has been deprecated as of April this year, and other methods usually used to obtain user’s friends were also deprecated.

However, this was critical to our app as one of our core features was to allow the user to see the wishlist of his Facebook friends, thus it was pertinent that we have back-up methods of utilising networks between users. With this in mind, we continued extensive research to find alternative methods to implement this core feature. Some methods that we thought had potential were react native contacts and Google account contacts, and we attempted to test these as well. However, we eventually found tutorials for which Facebook Graph API would still work for us.

3. Incorrect order that render() and componentWillMount() was called
This caused several bugs in the app as user information on the user who has just signed in could not be obtained from firebase, which was a function called through componentWillMount() before the screen renders. This resulted in the userID variable being assigned to nothing, which threw an error since the app cannot work when there exists no userID. 

To entirely eliminate and resolve this bug, we changed the order of which the functions were called in the code for all screens in the app.

4. Information stored in firebase was not in the order we desired
As of the current version of our application, information in the organiser is drawn from firebase and displayed in the order of date of creation. However, due to the features of our app, we desired to have the application retrieve and display information according to the dates of events the user has planned to gift his friends on.

We have thus far not been able to solve this problem, but it will be tackled before the submission of milestone 3.

5. Wishlist and organiser screens still show one item even after everything has been deleted
On both screens, deleting an item when there are multiple items will cause only that particular item to disappear. 

However, when there is only one item left, calling delete on that item will delete it on our Firebase Realtime Database. But, as the render() method has been called at the start (namely when the screen is first rendered), the last item is still shown on the screen itself. Only when the app is reloaded, namely when the user signs out and signs back in, does the correct output of “No Items” get displayed.

We have thus far not been able to solve this problem, but it will be tackled before the submission of milestone 3.

Insights after milestone 2
As of our current progress, we anticipate we might encounter several problems with our app, which we will target and resolve accordingly. 

1. Items are saved even when fields are empty
This will result in wrong or missing data being stored in firebase, which also cause problems during retrieval of gift ideas in the organiser since this is done by date. For example, when a gift is stored without an event, the gift idea will be retrieved as having an invalid date.


Updates from Milestone 3 
Features Developed
1. User interface overhaul
The UI has been simplified and cleaned up. Featuring a white UI with red accents, each wishlist item and organiser item has a unified aesthetic. 

2. User navigation finalised
Previously, after the user adds an item to his wishlist, the app does not navigate back to the wishlist screen, leaving the user on the current screen after exiting the alert. We did not find this very user-friendly and have since changed the navigation for this such that once the user adds an item, the app returns to the wishlist, where the user is able to readily add another item to his wishlist. This also applies when the user adds an item from his friend’s wishlist into his own organiser. 

3. Streamlined editing features of the wishlist
Users are able to swipe to delete items on the wishlist. Swiping right will reveal a trash can icon, swiping all the way will confirm the deletion of the item from the wishlist.

Users can click on the item or organiser item to edit information as well as delete the item itself, instead of having a delete button in the wishlist view itself, resulting in a cleaner UI. 

Furthermore, all numeric inputs for prices of gifts have been standardised to produce a number with 2 decimal places. This is also the case when the information is stored in firebase and is displayed as such upon retrieval from firebase. 

3. Organiser features
Items in the organiser are organised by the date and its corresponding event in chronological order. They are organised by sections where the section title is the date followed by event name (e.g. birthdays, Christmas, Mother’s Day). 

When an item is added into the user’s organiser from a friend’s wishlist, the friend’s wishlist (when viewed by others and not the friend himself) will indicate the person who is buying that particular gift. This feature was added in order to prevent mutual friends from buying the same gift for that particular friend and avoid getting duplicate gifts.

Each item in the organiser consists of a component. When the user clicks on that component, he will be directed to the edit screen which allows him to delete the gift, change the event which he plans to buy that gift for, and indicate whether the item has been declared bought or not through the means of a toggle button. This will allow the user to keep track of which gift ideas he has bought.

4. App Extension 
We also created an app extension that web crawls the Lazada product page for the gift name and gift price as well as the link. This extension can be found in the Android share sheet. Once clicked, the product URL is crawled. However, if the item is not from Lazada, it does not add to the wishlist.

When the user attempts to edit an item in his wishlist or organiser, there is a button to access the URL of the product, and tapping the button brings the user to the product page in his web browser. This will allow the user to make purchases on Lazada immediately without going through the hassle of finding that exact item himself, which can be very tedious. 

Problems encountered
1. Storing gift ideas in organiser by event dates (from milestone 2)
Storing gift ideas in organiser by event dates was more complicated than originally expected. Doing so required us to change how dates were stored and formatted in order for the SectionList Component to represent each corresponding gift idea to its date and event. 

Firstly, we had to store the dates for popular events (such as Christmas) on firebase. All dates were stored in the MMDD format (e.g. Christmas would have a value of 1225). This allowed us to sort dates by value.  

Secondly, we had to make a graph request for the user’s birthday and store it in firebase such that when the event Birthday is selected, it corresponds to the user’s birthday. This is done whenever the user signs in and reaches the wishlist screen. This allows us to query firebase for the birthday when we need to.

Thirdly, each organiser item is stashed under the date of that particular event. This allows us to order the events by date (as discussed earlier) as well as its corresponding item. The format was then converted such that it can be represented on the SectionList component accordingly.

2. Users are able to add items to their wishlist/organiser even with missing fields 
As mentioned in our insights from milestone 2, this can cause problems during storage and retrieval of information from firebase as gift ideas are sorted by date of events in the organiser. This may cause certain gift ideas to have invalid dates.

In order to resolve this, we included a check when the user clicks to add an item to firebase, namely, whether all fields have been filled. If any field is unfilled, then the user will see an alert that returns him to the previous page and informing him that not all fields were entered. Otherwise, the user will be to add items as per normal. This was also done for the organiser screen and the share extension.

3. Users should not be able to edit the gifts that were taken from friends’ wishlists
Since the user took a gift idea from his friend’s wishlist, he should not be the one changing information about that particular gift. 

Therefore, we disabled the user’s ability to change fields for gifts in the organiser. The only thing that the user would be able to access is to change the event that he plans to purchase that gift for, whether the gift has been bought and the link to access the gift on lazada (if that friend added this item through our share extension).

4. Share extension issues
In the process of implementing the share extension, we encountered 2 major issues. The first was the implementation of the app extension and making it appear on the android share sheet. The second was the scraping of information from the Lazada product page itself. 

The app extension was implemented using a module called react-native-share-extension. Although all the installation instructions were followed to a T, we just could not get the data we needed, namely, the URL of the page that would be shared. We had to use a fork of the module in order to get it to work and get the URL to be shared to our app itself.

Scraping information was also an issue as the gift price itself could not be scraped directly from the HTML of the link. We could only scrape the original price and find the discount given to the product. Thus, we had to do the calculations ourselves to produce an estimation of the price of the product. This was often not the same as what was displayed on Lazada due to the differences in their calculation algorithms. Therefore, we had to slightly overestimate prices of items. 

Insights after milestone 3
Unfortunately, as of milestone 3, we still have some unresolved bugs in our app. We will do our best to address these bugs following submission of milestone 3.

1. Swipe to delete on items higher on the list removes everything below the list
The swipe to delete feature we implemented only works for the last item on the wishlist, where it removes that item from the list after revealing a trash can.

However, if an item which is not the last on the wishlist is removed, all items below it will be removed consecutively until no items exist below the original item targeted. We have tried to work on this bug extensively, but so far are still unable to produce a viable solution for it.

2. Prevent duplicates from being added into the user’s wishlist
From the perspective of the user, it will be unlikely that the user would add two of the exact same items into his wishlist, especially after being prompted to be as specific with his wishes as possible (this occurs when the user adds to his wishlist). 

However, we feel that this might nevertheless be a possibility especially when one’s list gets too long, thus we attempted to resolve it using methods from firebase. We attempted to order information on firebase using orderByChild and filtering wishes that have the same name as the input field. However, this did not appear to work and we have thus far been unable to find a viable solution. 

3. Wishlist does not become empty even after deleting all items
When the user attempts to delete all items, upon deleting the last item, the wishlist will still show the last item that was deleted even though that item has already been deleted in firebase. 

We feel that this error is due to the code in render for the wishlist screen, but we are thus far unable to target the exact problem and derive a solution for it. 

Possible future additions
1. Setting reminders for when a gift should be purchased
Users are likely to forget buying their gift ideas unless they regularly check the organiser on their app. Thus, a possible addition to the app would be to include a reminder to the user whenever a gift is almost due for a particular event, but has not been indicated by the user as bought. This would reduce the likelihood of the user missing out gifts to get. 

We originally planned for this but due to time constraints, were unable to complete this feature.

2. Web-crawling for information on the product from Lazada
An alternative way to obtain information on the product other than web-crawling would be to use the Lazada seller center. However, this posed some difficulty to us as we would have to acquire permission from each seller for every product that we wanted to obtain information about. This was not feasible given the scale of our app, but we hope that future additions are able to utilise this method to obtain information directly from the source.

User feedback
We asked a group of users to test the prototype we made and acquired some valuable feedback.
When multiple items were created, and if they are the same price and name, the items should be grouped instead of shown individually. For example, if an item called Wallet with a price of $20 is added to the wishlist 3 times, it should be grouped as Wallet x 3. 
If an item on a friend’s wishlist is added to a mutual friend’s organiser, it should reflect on that screen, this is to ensure that 2 users do not get the friend the exact same gift. 
More bugs have been discovered, namely after clicking the add button when adding an item to wishlist, the screen should automatically be directed to the wishlist page instead of having to click the back button. Furthermore, the keyboard also covers the event dropdown list in the add gift idea to organiser screen, the keyboard had to be dismissed in order for the event to be chosen.
Users did not know that the swipe to delete feature existed and thus did not use it. Therefore it was suggested that an onboarding process is implemented for new users of the app right after signing in. However as we are not putting the app up on the Google Play store, we deemed this feature as not urgent.
Users also gave feedback on how they had to constantly sign in after quitting the app or switching to another app and thus found it cumbersome to do so. Therefore automatic login was a feature that was requested but we prioritized getting the app extension to work first and thus ran out of time to work on this feature.

Conclusion
We are immensely grateful for this opportunity to take part in NUS Orbital 2019. Our team has definitely learnt a lot from this experience and will continue to take this momentum forward in our future projects.
