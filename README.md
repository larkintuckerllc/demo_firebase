Introduce
=========

This is essentially a first real application, i.e., post "Hello World", using the [Firebase](http://firebase.com) realtime backend system. The key functionality that it exercises are data management, authentication (e.g., Facebook), authorization, and realtime updates.

The server code in this application only exists to provide a server serving up static files; another solution would be to host the static files with services provided by Firebase.

The particualarly interesting thing about this application is that the server code (firebase) consists of configuring the firebase instance with Facebook authentication and creating the following security rules configuration.

```
{
  "rules": {
    ".read": true,
    ".write": false,
    "users": {
      "$user_id": {
        ".write": "$user_id === auth.uid"
      }
    },
    "events": {
      "$event_id": {
        "meetings": {
          "$meeting_id": {
            ".write": "$meeting_id === auth.uid"
          }
        }
      }
    },
    "meetings": {
      "$meeting_id": {
          ".write": "$meeting_id === auth.uid"
      }
    }
  }
}
```
