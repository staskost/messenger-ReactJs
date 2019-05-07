import React, { Component } from 'react';
import UserContext from '../context/user-context';
import MessageRow from './MessageRow';
import PaginationFooter from './PaginationFooter';
import PaginationHeader from './PaginationHeader';

class Msg extends Component {

    constructor(props) {
        super(props);
        this.messagesPerPageOptions = [5, 10, 25];
        this.state = {
            messages: [],
            searchResults: [],
            currentPage: 0,
            resultsPerPage: this.messagesPerPageOptions[0],
            numberOfTotalPages: 0,
            numberOfTotalResults: 0,
            noResults: false
        };
        this.setActivePage = this.setActivePage.bind(this);
        this.setResultsPerPage = this.setResultsPerPage.bind(this);
        this.fetchPageResults = this.fetchPageResults.bind(this);

                if (this.props.folderType === 'INBOX') {
                    this.messagesTitle = 'Received';
                    this.senderOrReceiver = 'Sender';
                    this.fetchUrl = 'http://localhost:8080/messages/inbox2';
                } else if (this.props.folderType === 'OUTBOX') {
                    this.messagesTitle = 'Sent';
                    this.senderOrReceiver = 'Receiver';
                    this.fetchUrl = 'http://localhost:8080/messages/sent2';
                } else {
                    console.error('Unknown messages folder type');
                }
    }
    static contextType = UserContext;

    setActivePage(newActivePage) {
        this.setState({
            currentPage: newActivePage - 1,    
        }, () => this.fetchPageResults());
    }

    setResultsPerPage(option) {
        this.setState({
            currentPage: 0,
            resultsPerPage: option
        }, () => this.fetchPageResults());
    }

    handleDeletion = (id) =>{

        const url = 'http://localhost:8080/messages/delete/' + id;

        fetch(url, {
            method: 'POST',
            headers: {
                'X-MSG-AUTH': this.context.token
            },
        }).then(response => {
            console.log('Response status:', response.status);
            if (response.status === 200) {
                console.log('Message deleted.');
                this.fetchPageResults();
            }
        }).catch(error => console.error('Error:', error));
    }

    componentDidMount() {
        console.log('Messages component did mount');
        this.fetchPageResults();
    }

    fetchPageResults() {
        const url = this.fetchUrl+'?page=' + this.state.currentPage + '&size=' + this.state.resultsPerPage;
        fetch(url, {
            method: 'GET',
            headers: {
                'X-MSG-AUTH': this.context.token,
                'Accept': 'application/json',
            }
        }).then((response) => {
            if (response.status === 200) {
                response.json().then(data => {
                    const lastPageResults = data.count % this.state.resultsPerPage;
                    const pagesNumber = (lastPageResults > 0) ? (((data.count - lastPageResults) / this.state.resultsPerPage) + 1) : (data.count / this.state.resultsPerPage);
                    this.setState({
                        numberOfTotalPages: pagesNumber,
                        numberOfTotalResults: data.count,
                        messages: data.results,
                        noResults: data.count === 0 ? true : false
                    });
                })
            } else { 
                this.setState({
                    currentPage: 0,
                    messages: [],
                    numberOfTotalPages: 0,
                    numberOfTotalResults: 0,
                    noResults: true,
                });
            }
        }).catch(error => console.error('Error:', error));
    }
    render() {
        return (
            <React.Fragment>

                <PaginationHeader count={this.state.numberOfTotalResults} options={this.messagesPerPageOptions} activeOption={this.state.resultsPerPage} handle={this.setResultsPerPage} />

                <div className="container">
                    <div className="table-responsive-lg">
                        <table className="table table-striped table-borderless table-hover" id="messagesTable">
                            <thead>
                                <tr className="table-primary">
                                    <th>#</th>
                                    <th>{this.senderOrReceiver}</th>
                                    <th>Message</th>
                                    <th>Date</th>
                                    <th>Contact</th>
                                    <th>Delete</th>
                                    <th>Forward</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.messages.map((m, index) => {
                                    console.log('Updating li for message ' + index);
                                    return <MessageRow key={'mk_' + m.id} msg={m} folderType={this.props.folderType} i={((this.state.currentPage) * this.state.resultsPerPage) + (index + 1)} onDelete={this.handleDeletion}></MessageRow>
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                <PaginationFooter activePage={this.state.currentPage + 1} totalPages={this.state.numberOfTotalPages} handle={this.setActivePage} />
            </React.Fragment>
        );
    }
}
export default Msg;