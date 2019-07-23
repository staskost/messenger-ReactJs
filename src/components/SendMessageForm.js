import React from 'react'
import { Picker, emojiIndex } from 'emoji-mart';
import { Smile } from 'react-feather';
// import ReactTextareaAutocomplete from '@webscopeio/react-textarea-autocomplete';
import {toggleEmojiPicker, addEmoji} from './methods.js';

class SendMessageForm extends React.Component {

    constructor() {
        super()
        this.state = {
            message: '',
            showEmojiPicker: false
        }
        this.addEmoji = addEmoji.bind(this)
        this.toggleEmojiPicker = toggleEmojiPicker.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

    }

    handleChange(e) {
        this.setState({
            message: e.target.value
        })
        // if (this.props.onChange) {
        this.props.onChange()
        //   }
    }

    handleSubmit(e) {
        e.preventDefault()
        this.props.sendMessage(this.state.message)
        this.setState({
            message: ''
        })
    }

    render() {
        const {
            showEmojiPicker,
        } = this.state;
        return (
            <React.Fragment>
            {showEmojiPicker ? (
                <Picker set="emojione" onSelect={this.addEmoji} />
            ) : null}

                <form
                    onSubmit={this.handleSubmit}
                    className="send-message-form">
                    <button
                        type="button"
                        className="toggle-emoji"
                        onClick={this.toggleEmojiPicker}
                    >
                        <Smile />
                    </button>
                    <input
                        disabled={this.props.disabled}
                        onChange={this.handleChange}
                        value={this.state.message}
                        placeholder="Type your message and hit ENTER"
                        type="text" />
                </form>
             </React.Fragment>
        )
    }
}
export default SendMessageForm;