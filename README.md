# Welcome to EventLite

Check out the [Live Site](https://eventlite-q3yt.onrender.com/)!

### Introduction

EventLite is a clone of the Eventbrite website. The EventBrite platform is a marketplace and directory for a wide range of events all over the world. In this clone users can create accounts, buy tickets to events, create their own events, manage their purchases and keep a list of bookmarked events. They can browse events by time, location, category, and price as well as view events organized by specific users. While this clone doesnt have all the features of the original EventBrite website it has the core functionality while keeping the design and user expierecen as streamlined as possible. I took some creative liberties and added my own touch to the colors schemes, and layout of the website. 

Technologies implemented in this project include:
* Languages: Javascript, Ruby, Python, HTML, CSS
* Frontend: React-Redux
* Backend: Ruby on Rails
* Database: PostgreSQL
* Hosting: Render
* Assest Storage: AWS Simple Cloud Storage (S3)

# MVPs

## Profiles

A EventLite user can create their own account which persists all activity between sessions. 

![gif of profiles](assets/gifs/login.gif)


A user can always edit their profile after its been created. You can add a bio, or change your profile photo.

![gif of profiles](/assets/gifs/editProfile.gif)



Viewing and sorting events is as simple as choosing your desired filters and seeing the available events change. 

![gif of profiles](/assets/gifs/eventIndex.gif)


On the first visit to the page a fetch request is made to the backend for all the events. If succesful it adds the events to the browsers local storage for future access. Every time the index page is loaded it checks if the image urls are still active, if they are not, the fetch request is made again, otherwise the local storage data is added to the state. 

```
useEffect(() => {
        window.scrollTo(0, 0)
        const cachedEvents = localStorage.getItem('cachedEvents') 
        setLoading(true)

        if (cachedEvents) {
            const cachedEventsArray = JSON.parse(cachedEvents);
            fetch(cachedEventsArray[0]['imageUrl'])
                .then(res => {
                    if (!res.ok) {
                        localStorage.clear()
                        dispatch(getEvents())
                            .then(() => {
                                setLoading(false)
                            })
                    } else {
                        dispatch(addEvents(cachedEventsArray))
                        setLoading(false)
                    }  
                })
        } else {
            dispatch(getEvents())
                .then(() => {
                    setLoading(false)
            })
    }
        if (city) {
            setCityFilter(city)
        }
        setSearchParams({})
    }, [city, dispatch, setSearchParams])


```



Once logged in creating an event can be done whenever you like. Dont forget to upload a banner image or flyer for your event.

![gif of profiles](/assets/gifs/createEvent.gif)



To like an event and save it for later just click the heart icon present on every event card. To see all the events you have liked in one place, go to your likes tab located in the navigation bar.
 
![gif of profiles](/assets/gifs/likes.gif)




### Thanks

