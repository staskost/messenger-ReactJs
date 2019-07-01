import React, { Component } from 'react';
import UserContext from '../context/user-context';
import AdminUserMessageRow from './AdminUserMessageRow';
import PaginationFooter from './PaginationFooter';
import PaginationHeader from './PaginationHeader';

class AdminOutboxMessages extends Component {
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

    componentDidMount() {
        console.log('Messages component did mount');
        this.fetchPageResults();
    } 

    fetchPageResults() {
       
        const url = "http://localhost:8080/messages/sent/" + this.props.match.params.id +"?page=" + this.state.currentPage+ '&size=' + this.state.resultsPerPage;
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
                                    <th>Receiver</th>
                                    <th>Message</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.messages.map((m, index) => {
                                    console.log('Updating li for message ' + index);
                                    return <AdminUserMessageRow key={'mk_' + m.id} msg={m} folderType="OUTBOX" i={((this.state.currentPage) * this.state.resultsPerPage) + (index + 1)}></AdminUserMessageRow>
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                <PaginationFooter activePage={this.state.currentPage + 1} totalPages={this.state.numberOfTotalPages} handle={this.setActivePage} />
            </React.Fragment>
        );
}}

export default AdminOutboxMessages;