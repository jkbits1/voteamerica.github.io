import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { postUploadFile, uploadFileChosen } from '../actions/index.js';

const SubmitButton = styled.button`
  margin-top: 0px;
  margin-bottom: 20px;
`;

const UploadInfoDiv = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
`;

const UploadInfoListItemDiv = styled.div`
  margin-top: 5px;
  margin-bottom: 5px;
`;

const mapStateToProps = state => {
  const { apiInfo, loginInfo, uploadInfo } = state;

  return { apiInfo, loginInfo, uploadInfo };
};

const mapDispatchToProps = {
  // loginDetails,
  // login,
  // loginSuccess,
  // logout,
  // getDriversList,
  // getRidersList,
  // getMatchesList,
  // getMatchesOtherDriverList
  uploadFileChosen,
  postUploadFile
};

class UploadAreaBase extends Component {
  fileChoiceButtonClickHandler(self) {
    return event => {
      const { uploadFileChosen } = self.props;
      event.preventDefault();

      const fileDetails = event.target.files[0];

      return uploadFileChosen(fileDetails);
    };
  }

  postButtonClickHandler(self) {
    return event => {
      const { apiInfo, loginInfo, uploadInfo, postUploadFile } = self.props;

      event.preventDefault();

      if (
        uploadInfo.fileDetails === undefined ||
        uploadInfo.fileDetails === {}
      ) {
        return;
      }

      const token = loginInfo.token || '';

      return postUploadFile(apiInfo.apiUrl, token, uploadInfo.fileDetails);
    };
  }

  render() {
    const { uploadInfo, loginInfo } = this.props;

    const fileChoiceStyle = { marginBottom: 20 };

    const notAllRowsInputIntoDb =
      uploadInfo.processingResults.recordsReceived >
      uploadInfo.processingResults.uploadCount;

    const errorsLoadedStyle = notAllRowsInputIntoDb ? { color: 'red' } : {};

    return (
      <div id="uploadArea">
        {loginInfo.loggedIn === true ? (
          <div>
            <h2 style={{ marginTop: 40 }}>Upload Area</h2>
            <p>
              <span>
                <strong>IMPORTANT:</strong>
              </span>
              &nbsp; take care not to upload the same file twice, as this will
              create duplicates on the system
            </p>
            <form
              action="http://localhost:8000/bulk-upload"
              method="post"
              encType="multipart/form-data"
            >
              <div>
                <div style={fileChoiceStyle}>
                  <label htmlFor="file">Choose file to upload</label>
                  <input
                    style={{ marginTop: 10 }}
                    type="file"
                    id="file"
                    name="file"
                    onChange={this.fileChoiceButtonClickHandler(this)}
                  />
                </div>
                {uploadInfo.fileChosen === true &&
                uploadInfo.fileBeingProcessed === false ? (
                  <div>
                    <SubmitButton
                      className="button button--large"
                      id="postUploadButton"
                      onClick={this.postButtonClickHandler(this)}
                    >
                      Submit
                    </SubmitButton>
                  </div>
                ) : (
                  <div>
                    {uploadInfo.fileChosen === true &&
                    uploadInfo.fileBeingProcessed === true ? (
                      <div>File being processed </div>
                    ) : (
                      false
                    )}
                  </div>
                )}
                {uploadInfo.fileChosen === true &&
                uploadInfo.fileBeingProcessed === false &&
                uploadInfo.showProcessingResults === true ? (
                  <div>
                    {notAllRowsInputIntoDb ? (
                      <div>
                        <span>
                          <strong style={{ color: 'red' }}>IMPORTANT:</strong>{' '}
                          Not all records were input into the db. Review the
                          information below to resolve this.
                        </span>
                      </div>
                    ) : (
                      false
                    )}

                    <UploadInfoDiv>
                      Records received:&nbsp;
                      {uploadInfo.processingResults.recordsReceived}
                    </UploadInfoDiv>
                    <UploadInfoDiv>
                      Records loaded into db:&nbsp;
                      <span style={errorsLoadedStyle}>
                        {uploadInfo.processingResults.uploadCount}
                      </span>
                    </UploadInfoDiv>
                    {uploadInfo.processingResults.inputErrorsCount &&
                    uploadInfo.processingResults.inputErrorsCount > 0 ? (
                      <UploadInfoDiv>
                        Input errors count:&nbsp;
                        {uploadInfo.processingResults.inputErrorsCount}
                      </UploadInfoDiv>
                    ) : (
                      false
                    )}
                    {uploadInfo.processingResults.inputErrors &&
                    uploadInfo.processingResults.inputErrors.length > 0 ? (
                      <UploadInfoDiv>
                        Input errors:&nbsp;
                        <ul>
                          {uploadInfo.processingResults.inputErrors.map(
                            (r, index) => (
                              <li key={index}>
                                <UploadInfoListItemDiv>
                                  Error type: {r.type.toString()}
                                </UploadInfoListItemDiv>
                                <UploadInfoListItemDiv>
                                  Db error: {r.error.toString()}
                                </UploadInfoListItemDiv>
                                <UploadInfoListItemDiv>
                                  Data row: {JSON.stringify(r.data)}
                                </UploadInfoListItemDiv>
                              </li>
                            )
                          )}
                        </ul>
                      </UploadInfoDiv>
                    ) : (
                      false
                    )}
                  </div>
                ) : (
                  false
                )}
              </div>
            </form>
          </div>
        ) : (
          false
        )}
      </div>
    );
  }
}

/*
{uploadInfo.fileChosen === true &&
                      uploadInfo.fileBeingProcessed === true ? <div>File being processed </div> :
                  false
                )}
*/

const UploadArea = connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadAreaBase);

export default UploadArea;
