import React, { useEffect, useState } from "react";
import styled from "styled-components";

const SongListItem = ({ songs }) => {
  console.log(songs[0]);
  return (
    !!songs.length &&
    songs.map((song) => {
      return (
        <div>
          <li key={song.rank}>
            <Wrapper>
              <RankingWrapper>
                <Ranking>{`#${song.rank}`}</Ranking>
                <Streams>({song.streams} streams)</Streams>
              </RankingWrapper>
              <TitleWrapper>
                <Title>{song.title}</Title>
                <Artist>by {song.artist}</Artist>
              </TitleWrapper>
              <DateWrapper>
                <PubDate>publication date: {song.publicationDate}</PubDate>
              </DateWrapper>
            </Wrapper>
          </li>
        </div>
      );
    })
  );
};

//wrapper, rankingwrapper, ranking, streams,
//titlewrapper, title, artist, datewrapper

const Wrapper = styled.div`
  display: flex;
  position: relative;
  border: 1px solid lightgrey;
`;

const RankingWrapper = styled.div`
  margin: 10px 0px 0px 20px;
`;
const Ranking = styled.p`
  font-size: 40px;
  font-weight: bold;
  padding-left: 10px;
`;

const Streams = styled.p`
  font-size: 14px;
  color: grey;
`;

const TitleWrapper = styled.div`
  margin: 10px 0px 0px 20px;
`;

const Title = styled.p`
  font-size: 20px;
  font-weight: bold;
`;

const Artist = styled.p`
  font-style: italic;
  font-size: 20px;
`;

const DateWrapper = styled.div`
  position: absolute;
  right: 15px;
`;

const PubDate = styled.p`
  font-size: 12px;
  /* position: absolute;
  top: 10px;
  right: 30px; */
`;

export default SongListItem;
