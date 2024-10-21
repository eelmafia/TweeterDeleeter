(function () {
  let ch_ua
  let csrf = getFromCookies('ct0')
  let twid = getFromCookies('twid').split("u%3D")[1]
  let lang = getFromCookies("lang")
  let authorization = "YOU NEED TO ADD THIS" //IMPORTANT
  let client_transactionID = "YOU NEED TO ADD THIS" //IMPORTANT
  let client_UUID = "YOU NEED TO ADD THIS" //IMPORTANT
  let username = "YOU NEED TO ADD THIS" //IMPORTANT *without the @

  // HELPERS

  function getHeaders() {
    return {
      "accept": "*/*",
      "accept-language": "en-GB,en-US,en,de",
      "authorization": authorization,
      "content-type": "application/json",
      ...ch_ua,
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-client-transaction-id": client_transactionID,
      "x-client-uuid": client_UUID,
      "x-csrf-token": csrf,
      "x-twitter-active-user": "yes",
      "x-twitter-auth-type": "OAuth2Session",
      "x-twitter-client-language": lang,
    }
  }

  async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  async function initCHUA() {
    if (navigator.userAgentData) {
      let ua = await navigator.userAgentData.getHighEntropyValues(["platform", "platformVersion"])
      ch_ua = {
        "sec-ch-ua": ua.brands.map(item => `"${item.brand}";v="${item.version}"`).join(", "),
        "sec-ch-ua-mobile": `?${ua.mobile ? 1 : 0}`,
        "sec-ch-ua-platform": `"${ua.platform}"`
      };
    }
  }

  function getFromCookies(key) {
    let regex = new RegExp(`${key}=([^;]*)`);
    return document.cookie.match(regex)[0].split('=')[1];
  }

  async function fetchData(type) {
    let tweetsUrl = `https://x.com/i/api/graphql/HmWGzuzXoI6uFqqX6QNhEg/UserTweetsAndReplies?variables=%7B%22userId%22%3A%22${twid}%22%2C%22count%22%3A20%2C%22includePromotedContent%22%3Atrue%2C%22withCommunity%22%3Atrue%2C%22withVoice%22%3Atrue%2C%22withV2Timeline%22%3Atrue%7D&features=%7B%22rweb_tipjar_consumption_enabled%22%3Atrue%2C%22responsive_web_graphql_exclude_directive_enabled%22%3Atrue%2C%22verified_phone_label_enabled%22%3Afalse%2C%22creator_subscriptions_tweet_preview_api_enabled%22%3Atrue%2C%22responsive_web_graphql_timeline_navigation_enabled%22%3Atrue%2C%22responsive_web_graphql_skip_user_profile_image_extensions_enabled%22%3Afalse%2C%22communities_web_enable_tweet_community_results_fetch%22%3Atrue%2C%22c9s_tweet_anatomy_moderator_badge_enabled%22%3Atrue%2C%22articles_preview_enabled%22%3Atrue%2C%22responsive_web_edit_tweet_api_enabled%22%3Atrue%2C%22graphql_is_translatable_rweb_tweet_is_translatable_enabled%22%3Atrue%2C%22view_counts_everywhere_api_enabled%22%3Atrue%2C%22longform_notetweets_consumption_enabled%22%3Atrue%2C%22responsive_web_twitter_article_tweet_consumption_enabled%22%3Atrue%2C%22tweet_awards_web_tipping_enabled%22%3Afalse%2C%22creator_subscriptions_quote_tweet_preview_enabled%22%3Afalse%2C%22freedom_of_speech_not_reach_fetch_enabled%22%3Atrue%2C%22standardized_nudges_misinfo%22%3Atrue%2C%22tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled%22%3Atrue%2C%22rweb_video_timestamps_enabled%22%3Atrue%2C%22longform_notetweets_rich_text_read_enabled%22%3Atrue%2C%22longform_notetweets_inline_media_enabled%22%3Atrue%2C%22responsive_web_enhance_cards_enabled%22%3Afalse%7D&fieldToggles=%7B%22withArticlePlainText%22%3Afalse%7D`
    let likesUrl = `https://x.com/i/api/graphql/px6_YxfWkXo0odY84iqqmw/Likes?variables=%7B%22userId%22%3A%22${twid}%22%2C%22count%22%3A20%2C%22includePromotedContent%22%3Afalse%2C%22withClientEventToken%22%3Afalse%2C%22withBirdwatchNotes%22%3Afalse%2C%22withVoice%22%3Atrue%2C%22withV2Timeline%22%3Atrue%7D&features=%7B%22rweb_tipjar_consumption_enabled%22%3Atrue%2C%22responsive_web_graphql_exclude_directive_enabled%22%3Atrue%2C%22verified_phone_label_enabled%22%3Afalse%2C%22creator_subscriptions_tweet_preview_api_enabled%22%3Atrue%2C%22responsive_web_graphql_timeline_navigation_enabled%22%3Atrue%2C%22responsive_web_graphql_skip_user_profile_image_extensions_enabled%22%3Afalse%2C%22communities_web_enable_tweet_community_results_fetch%22%3Atrue%2C%22c9s_tweet_anatomy_moderator_badge_enabled%22%3Atrue%2C%22articles_preview_enabled%22%3Atrue%2C%22responsive_web_edit_tweet_api_enabled%22%3Atrue%2C%22graphql_is_translatable_rweb_tweet_is_translatable_enabled%22%3Atrue%2C%22view_counts_everywhere_api_enabled%22%3Atrue%2C%22longform_notetweets_consumption_enabled%22%3Atrue%2C%22responsive_web_twitter_article_tweet_consumption_enabled%22%3Atrue%2C%22tweet_awards_web_tipping_enabled%22%3Afalse%2C%22creator_subscriptions_quote_tweet_preview_enabled%22%3Afalse%2C%22freedom_of_speech_not_reach_fetch_enabled%22%3Atrue%2C%22standardized_nudges_misinfo%22%3Atrue%2C%22tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled%22%3Atrue%2C%22rweb_video_timestamps_enabled%22%3Atrue%2C%22longform_notetweets_rich_text_read_enabled%22%3Atrue%2C%22longform_notetweets_inline_media_enabled%22%3Atrue%2C%22responsive_web_enhance_cards_enabled%22%3Afalse%7D&fieldToggles=%7B%22withArticlePlainText%22%3Afalse%7D`

    let fetchResponse = await fetch(type === "tweets" ? tweetsUrl : likesUrl, {
      "headers": getHeaders(),
      "referrer": `https://x.com/${username}/${type === "tweets" ? "with_replies" : "likes"}`,
      "referrerPolicy": "strict-origin-when-cross-origin",
      "body": null,
      "method": "GET",
      "mode": "cors",
      "credentials": "include"
    });

    if (!fetchResponse.ok) {
      throw new Error(`Error with status: ${fetchResponse.status}`);
    }

    let data = await fetchResponse.json();
    let entries = data?.data?.user?.result?.timeline_v2?.timeline?.instructions.find(item => item.type === "TimelineAddEntries")?.entries

    return entries ? entries : []
  }

  let deleteHash = "VaenaVgh5q5ih7kvyVjgtg"
  let unfavoriteHash = "ZYKSe-w7KEslx3JhSIk5LA"

  async function sendRemove(type, postID) {
    let url = `https://x.com/i/api/graphql/${type === "tweet" ? (deleteHash + "/DeleteTweet") : (unfavoriteHash + "/UnfavoriteTweet")}`
    let fetchResponse = await fetch(url, {
      "headers": getHeaders(),
      "referrer": `https://x.com/${username}/${type === "tweet" ? "with_replies" : "likes"}`,
      "referrerPolicy": "strict-origin-when-cross-origin",
      "body": `{\"variables\":{\"tweet_id\":\"${postID}\",\"dark_request\":false},\"queryId\":\"${type === "tweet" ? deleteHash : unfavoriteHash}\"}`,
      "method": "POST",
      "mode": "cors",
      "credentials": "include"
    });

    if (!fetchResponse.ok) {
      console.log(`Error removing ${type}. Waiting and moving on.`)
      await sleep(5000);
    }

    await sleep(300);
    return fetchResponse.ok
  }

  // MAIN FUNCTIONS

  async function deleteTweets() {
    let again
    do {
      again = false
      let tweets = await fetchData("tweets")

      for (const entry of tweets) {
        //check if it's something we can delete
        if (entry.entryId.startsWith("tweet-") || entry.entryId.startsWith("profile-conversation")) {
          let tweet_id;
          let isProfileConvo = entry.entryId.startsWith("profile-conversation");
          let items = isProfileConvo ? entry.content.items : [{ item: entry.content }];
          for (const item of items) {
            let result = item.item.itemContent.tweet_results.result
            let tweetResult = result.tweet ? result.tweet.legacy : result.legacy

            if (tweetResult.user_id_str === twid) {
              tweet_id = tweetResult.id_str;
              break;
            }
          }

          console.log("Deleting tweet...")
          let success = await sendRemove("tweet", tweet_id);
          if (success) {
            again = true;
          }
        }
      }
    } while (again)
  }

  async function deleteLikes() {
    let again
    do {
      again = false
      let likes = await fetchData("likes")

      for (const entry of likes) {
        if (entry.entryId.startsWith("tweet-")) {
          let tweet_id = entry.entryId.split("tweet-")[1]

          console.log("Removing like...")
          let success = await sendRemove("like", tweet_id);
          if (success) {
            again = true;
          }
        }
      }
    } while (again)
  }

  async function startDeleeter() {
    await initCHUA();
    await deleteTweets()
    await deleteLikes()

    console.log("Finito")
  }

  startDeleeter()
})()
