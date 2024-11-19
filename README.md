# Tweeter Deleeter

## Delete all your Twitter (currently known as X) activity
I was tired of the slop that Twitter (currently known as X) has become  so I quickly wrote this to nuke my activity. 

Use it to remove all your tweets, retweets, replies, quotes, media & likes <sup>(they're private now but you never know!) <sup> 

## How to use

I turned this into a Chrome extension with no user effort required. If you're using Chrome consider using that instead. 

* [Chrome web store link](https://chromewebstore.google.com/detail/tweeter-deleeter/abgmheddoaokgganklgbjbnkdfjijign)
* [Extension sourcecode here](https://github.com/eelmafia/Tweeter-Deleeter-Extension)

The script needs you to add 4 values to it in order to work. These are: your username, Authorization, X-Client-Transaction-Id, X-Client-Uuid

Steps
 1. Open the dev console while on twitter (`CTRL + SHIFT + I`)
 2. Open the console and paste the entire contents of `deleeter.js` in there
 3. Go to the Network tab and click on `Fetch/XHR` (right of the filter box)
 4. Find a request which has the tokens we need (refer to screenshot)
 5. Replace the '*YOU NEED TO ADD THIS*' sections located at the top of the script with the tokens 
 6.  Add your username as well
 7. Press enter, it should do the rest

Screenshot for reference. If the first request you click on doesn't have the 3 tokens you need keep looking for one that has. 
![deeleter](https://github.com/user-attachments/assets/72a94186-704d-4c13-9715-d8658b650473)
