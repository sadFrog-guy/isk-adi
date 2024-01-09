import React from "react"
import { useDispatch } from "react-redux"
import { ReactComponent as CloseIcon } from "../icons/close.svg"

const StoriesModal = ({ stories, story, close, selectStory }) => {
    const dispatch = useDispatch()

    return (
        <div className="stories-modal">
            <div
                onClick={close}
                className="stories-modal-close"
            >
                <CloseIcon />
            </div>
            <div className="stories-container-buttons">
                {stories.map((s) => (
                    <div
                        key={s._id}
                        onClick={() => {
                            selectStory(s)
                            dispatch.stories.setWatched(s._id)
                        }}
                        className={
                            s._id === story._id
                                ? "stories-button-active"
                                : "stories-button"
                        }
                    ></div>
                ))}
            </div>
            <div>
                <img
                    src={story.img}
                    alt="story image"
                />
            </div>
        </div>
    )
}

export default StoriesModal
