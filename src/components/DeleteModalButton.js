import React, { Component } from 'react';

class DeleteModalButton extends Component {

    render() {
        return (
            <React.Fragment>
                <button type="button" className="btn btn-outline-danger btn block" data-toggle="modal" data-target={'#deleteModal'+this.props.msg.id}>Delete</button>
                <div className="modal fade" id={'deleteModal'+this.props.msg.id}>
                    <div className="modal-dialog modal-sm">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="deleteModalLabel">Delete</h5>
                                <button className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <div className="text-center">
                                    Are you sure you want to delete the following message:
                            </div>
                                <h2>{this.props.msg.text}</h2>
                                <div className="modal-footer justify-content-center">
                                    <button className="btn btn-secondary" data-dismiss="modal">No</button>
                                    <button className="btn btn-danger" data-dismiss="modal" onClick={this.props.onDelete.bind(this, this.props.msg.id)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default DeleteModalButton;
