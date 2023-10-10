import { tweetsData } from './data.js'
import { v4 as uuidv4} from 'https://jspm.dev/uuid'



// tweetBtn.addEventListener('click', function(){
//     console.log(tweetInput.value)
// })
document.addEventListener('click',function(e){
    if (e.target.dataset.like){
        return handleClickLike(e.target.dataset.like)
    }
    /*
Challenge:
1. Make this eventListener call "handleRetweetClick" 
   when the retweet icon is clicked, passing in the
   uuid from that tweet.  
*/
    else if(e.target.dataset.retweet){
        return handleClickRetweet(e.target.dataset.retweet)
    }
    else if (e.target.dataset.reply){
        return handleRepliesClick(e.target.dataset.reply)
    }
    else if (e.target.id){
        handleButtonClick(e.target.id)
    }
})
function handleClickLike (tweetUid){
    /*
    Challenge:
1. Iterate over tweetsData and use the uuid 
   saved in tweetId to identify the liked
   tweet's object. Save that object to a 
   new const called 'targetTweetObj'.
⚠️ targetTweetObj should hold an object, NOT
   an array.
2. Increment targetTweetObj's 'likes' count 
   by 1.
3. Log out targetTweetObj.
*/

    const targetTweetObj = tweetsData.filter(function(tweet){
    return tweet.uuid == tweetUid
    })[0]

    /*
Challenge:
1. When a tweet is liked, it's 'isLiked' property
   should be set to true.
2. When a tweet is unliked, it's 'isLiked' property
   should be set to false and its 'likes' count
   should be decremented.
*/   
    if (targetTweetObj.isLiked){
        targetTweetObj.likes--
        // targetTweetObj.isLiked = false
    }
    else{
        targetTweetObj.likes++
        // targetTweetObj.isLiked = true
    }
    targetTweetObj.isLiked = !targetTweetObj.isLiked
    render()
}
function handleClickRetweet (tweetUid){
    
    /*
    Challenge:
1. Iterate over tweetsData and use the uuid 
   saved in tweetId to identify the retweeted
   tweet's object. Save that object to a 
   new const called 'targetTweetObj'.
⚠️ targetTweetObj should hold an object, NOT
   an array.
2. Increment targetTweetObj's 'retweets' count 
   by 1.
3. Log out targetTweetObj.
*/

    const targetTweetObj = tweetsData.filter(function(tweet){
    return tweet.uuid == tweetUid
    })[0]

    /*
Challenge:
1. When a tweet is retweeted, it's 'isRetweeted' property
   should be set to true.
2. When a tweet is unliked, it's 'isRetweeted' property
   should be set to false and its 'retweets' count
   should be decremented.
*/   
    if (targetTweetObj.isRetweeted){
        targetTweetObj.retweets--
        // targetTweetObj.isRetweeted = false
    }
    else{
        targetTweetObj.retweets++
        // targetTweetObj.isRetweeted = true
    }
    targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted

    render()
}
function handleRepliesClick(tweetUid){
    document.getElementById(`replies-${tweetUid}`).classList.toggle('hidden')
}
function handleButtonClick(tweetId){
    const tweetInput = document.getElementById('tweet-input')
    if(tweetId == 'tweet-btn'){
        console.log(tweetInput.value)
        if(tweetInput.value){
            tweetsData.unshift({
                handle: `@ogazboiz`,
                profilePic: `images/ogazboiz.png`,
                likes: 0,
                retweets: 0,
                tweetText: tweetInput.value,
                replies: [],
                isLiked: false,
                isRetweeted: false,
                uuid: uuidv4()
            })
            render()
            tweetInput.value = ''
        }
        
    }
}
function getFeedHtml() {
  

 let feedHtml = ""

 tweetsData.forEach(function (tweet){
    /*
Challenge:
1. Use an if statement to set the value of 
   'likeIconClass' to the string 'liked' 
   if the tweet has been liked. 
2. In the like icon tag, add 'likeIconClass' 
   to the list of classes.
*/            
    let likeIconClass = ''
    if (tweet.isLiked){
        likeIconClass = 'liked'
    }

    let retweetIconClass= ''
    if(tweet.isRetweeted){
        retweetIconClass= 'retweeted'
    }

    let repliesHtml = ''
    if (tweet.replies.length > 0){
        tweet.replies.forEach(function (reply){
            repliesHtml+=`
        <div class="tweet-reply">
            <div class="tweet-inner">
                <img src="${reply.profilePic}" class="profile-pic">
                    <div>
                        <p class="handle">${reply.handle}</p>
                        <p class="tweet-text">${reply.tweetText}</p>
                    </div>
                </div>
        </div>
        `
        })
        
        
    }


    /*
Challenge:
1. Inside each span that has a class of "tweet-detail",
   add an <i> tag.
2. Give each <i> tag the classes it needs to render the
   correct icons next to the numbers.
   The classes you will need are:
    fa-regular, 
    fa-solid, 
    fa-comment-dots, 
    fa-heart, 
    fa-retweet
*/
 /*
Challenge:
1. Add data attributes to each of the  <i> tags. You can call
   them 'reply', 'like', and 'retweet’.
2. Each data attribute should hold the tweet's uuid.
*/
    feedHtml += `
    <div class="tweet">
        <div class="tweet-inner">
            <img src="${tweet.profilePic}" class="profile-pic">
            <div>
                <p class="handle">${tweet.handle}</p>
                <p class="tweet-text">${tweet.tweetText}</p>
                <div class="tweet-details">
                    <span class="tweet-detail">
                        <i class=" fa-regular fa-comment-dots " data-reply="${tweet.uuid}"></i>
                        ${tweet.replies.length}
                    </span>
                    <span class="tweet-detail">
                        <i class="fa-solid fa-heart ${likeIconClass}" data-like="${tweet.uuid}"></i>
                        ${tweet.likes}
                    </span>
                    <span class="tweet-detail">
                        <i class=" fa-solid fa-retweet ${retweetIconClass} " data-retweet="${tweet.uuid}"></i>
                        ${tweet.retweets}
                    </span>
                </div>   
            </div>            
        </div>
        <div class = "hidden" id="replies-${tweet.uuid}">
            ${repliesHtml}
        </div>   
    </div>
`
 })

return feedHtml

}

function render(){
    
    document.getElementById('feed').innerHTML = getFeedHtml()
}


render()
    
