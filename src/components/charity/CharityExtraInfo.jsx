import React from 'react';
const CharityExtraInfo = ({ charityDetail }) => {
  return (
    <div className="charityExtraInfo">
      <div id="infoHeader">
        <p>Charity Details</p>
      </div>
      <section id="other-info">
        <div id="info">Years Operating : {charityDetail.Years}</div>
        <div id="info">
          <a
            style={{ color: 'var(--purple-dino)' }}
            rel="noopener noreferrer"
            target="_blank"
            href={charityDetail.watchURL}
          >
            Charity Watch Link{' '}
          </a>
        </div>
        <div id="info">Charity Watch Grade : {charityDetail.watchGrade}</div>

        <div id="info">Impact Area : {charityDetail.Impact}</div>
        <div id="info">Added By : {charityDetail.addedBy}</div>
      </section>
    </div>
  );
};

export default CharityExtraInfo;
