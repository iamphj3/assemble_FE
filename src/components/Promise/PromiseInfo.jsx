import 'react-datepicker/dist/react-datepicker.css';

import {
  PromiseDescription,
  PromiseEndDate,
  PromiseId,
  PromiseName,
  PromisePlace,
  PromiseStartDate,
  VoteName,
  VoteOptions,
} from '../../recoil/atom';
import { postCreateVote, postPromise } from '../../lib/promise';

import DatePicker from 'react-datepicker';
import Header from '../common/Header';
import { IcHome } from '../../assets/icons';
import { IcPrograss2 } from '../../assets/icons';
import OneButton from '../common/OneButton';
import React from 'react';
import { ko } from 'date-fns/esm/locale';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { useState } from 'react';

const PromiseInfo = () => {
  const [promiseName, setPromiseName] = useRecoilState(PromiseName);
  const [promiseDescription, setPromiseDescription] = useRecoilState(PromiseDescription);

  const [placeNum, setPlaceNum] = useState(0);

  const [promisePlace, setPromisePlace] = useRecoilState(PromisePlace);
  const [promiseStartDate, setPromiseStartDate] = useRecoilState(PromiseStartDate);
  const [promiseEndDate, setPromiseEndDate] = useRecoilState(PromiseEndDate);

  const [voteName, setVoteName] = useRecoilState(VoteName);
  const [voteOptions, setVoteOptions] = useRecoilState(VoteOptions);
  const [promiseId, setPromiseId] = useRecoilState(PromiseId);

  const navigatePage = useNavigate();

  const initPromiseData = () => {
    setPromiseName('');
    setPromiseDescription('');
    setPromisePlace('');
    setPromiseStartDate(new Date());
    setPromiseEndDate(new Date());
    setVoteName('');
    setVoteOptions([''], ['']);
  };

  const handleCreatePromise = async () => {
    const res = await postPromise(
      promiseName,
      promiseStartDate,
      promiseEndDate,
      promiseDescription,
      promisePlace,
    );
    setPromiseId(res._id);

    if (voteName && voteOptions) {
      await postCreateVote(voteName, res._id, voteOptions);
    }

    navigatePage('/invite');
    initPromiseData();
  };

  return (
    <>
      <StInfoWrapper>
        <Header headerName={'약속 정보 입력'} />
        <StHomeBtn
          type='button'
          onClick={() => {
            navigatePage('/home');
          }}
        >
          <IcHome />
        </StHomeBtn>
        <StCurPage>
          <span>2</span> / 2
        </StCurPage>
        <StLine>
          <IcPrograss2 />
        </StLine>
        <Container>
          <h2>약속에 대한 정보를 입력해주세요!</h2>
          <div className='pDate'>
            <div>약속 일시</div>
            <div>
              <SDatePicker
                selected={promiseStartDate}
                dateFormatCalendar='yyyy년 MM월'
                dateFormat='MM/dd HH시 mm분'
                locale={ko}
                minDate={new Date()}
                showTimeSelect
                timeFormat='HH:mm'
                timeIntervals={30}
                onChange={(date) => {
                  setPromiseStartDate(date);
                  setPromiseEndDate(date);
                }}
              />
            </div>
          </div>
          <div className='pPlace'>
            <p>장소(선택)</p>
            {voteName ? (
              <StMakeVoteBtn
                type='button'
                onClick={() => {
                  navigatePage('/promise/vote');
                }}
              >
                투표가 생성되었습니다.
              </StMakeVoteBtn>
            ) : (
              <>
                <div>
                  <Input
                    value={promisePlace}
                    placeholder='강남, 온라인 등'
                    onChange={(e) => {
                      setPlaceNum(e.target.value.length);
                      setPromisePlace(e.target.value);
                    }}
                    maxLength='10'
                  />
                  <StPlaceNum>{placeNum}/10</StPlaceNum>
                </div>

                <StMakeVoteBtn
                  type='button'
                  onClick={() => {
                    navigatePage('/promise/vote');
                  }}
                >
                  투표 만들기
                </StMakeVoteBtn>
              </>
            )}
          </div>
        </Container>
      </StInfoWrapper>
      <OneButton
        btnName='약속 생성'
        handleClick={handleCreatePromise}
        disabled={!promiseStartDate || !promiseEndDate || !(promisePlace || voteName)}
      />
    </>
  );
};

export default PromiseInfo;

const StHomeBtn = styled.button`
  position: absolute;
  top: 2rem;
  left: 3.4rem;
  z-index: 10;

  width: 4rem;
  height: 4rem;
  background-color: ${({ theme }) => theme.colors.Grey300};

  border-radius: 1rem;
`;

const StInfoWrapper = styled.div`
  position: relative;

  padding: 0 2rem;
`;

const StLine = styled.div`
  display: flex;
  justify-content: center;
  & > svg {
    margin-top: 2rem;
  }
`;

const StCurPage = styled.p`
  position: absolute;
  top: 2.8rem;
  right: 3.4rem;
  z-index: 10;

  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 148%;

  color: #cdd2d9;

  & > span {
    color: black;
    font-size: 1.4rem;
  }
`;

const SDatePicker = styled(DatePicker)`
  width: 24rem;
  text-align: center;
  margin-top: 1.5rem;
  border: 0rem;
  background-color: transparent;
  cursor: pointer;
  font-size: 1.6rem;
`;
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;

  margin-top: 2.7rem;
  align-items: left;
  text-align: center;
  width: 100%;
  height: 100vh;

  border-radius: 2rem;
  background-color: white;

  & > div {
    display: flex;
    flex-wrap: wrap;

    & > div {
      position: relative;
      right: 2rem;
      color: black;
      font-family: 'Pretendard';
      font-weight: 600;
      font-size: 1.4rem;
      line-height: 148%;
    }
    & > .title {
      position: relative;
      text-align: center;
      left: 7rem;
      color: black;
      font-family: 'Pretendard';
      font-weight: 600;
      font-size: 1.4rem;
      line-height: 148%;
    }
  }

  & > h2 {
    text-align: left;
    margin-top: 2rem;

    color: black;
    font-family: 'Pretendard';
    font-weight: 700;
    font-size: 1.8rem;
    line-height: 150%;
  }
  & > .pDate {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    width: 100%;
    height: 4.8rem;
    margin-top: 2rem;
    margin-bottom: 1rem;

    border-radius: 0.8rem;
    background-color: ${({ theme }) => theme.colors.Grey200};

    /* font-size: 2rem; */

    & > div:first-child {
      margin-left: 3rem;
      margin-top: 1.2rem;
      color: black;
      font-family: 'Pretendard';
      font-weight: 700;
      font-size: 1.6rem;
      line-height: 148%;
    }
  }
  & > .pPlace {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    text-align: center;

    & > p {
      margin-top: 1rem;
      text-align: left;

      color: black;
      font-family: 'Pretendard';
      font-weight: 700;
      font-size: 1.6rem;
      line-height: 148%;
    }
    & > div {
      display: flex;
      justify-content: space-between;
      margin-top: 1rem;
      margin-left: 2rem;

      width: 100%;
      border: 0.1rem solid #e8eaed;
      border-radius: 0.8rem;
      background-color: white;
      margin-bottom: 1rem;

      & > p {
        margin-top: 1rem;

        color: black;
        font-family: 'Pretendard';
        font-weight: 400;
        font-size: 1.4rem;
        line-height: 148%;
        text-align: center;
      }
    }
  }
`;

const Input = styled.input`
  width: 25rem;
  height: 4.5rem;
  position: relative;

  border: 0rem;
  font-size: 1.6rem;
  text-align: center;

  &::placeholder {
    color: ${({ theme }) => theme.colors.Grey400};
  }
`;

const StPlaceNum = styled.p`
  margin-right: 2rem;
  color: black;

  & > p {
    color: black;
  }
`;

const StMakeVoteBtn = styled.button`
  width: 100%;
  height: 4.8rem;
  position: relative;

  padding: 0.6rem 1.2rem;
  margin-top: 1rem;

  border-radius: 0.8rem;
  font-size: 1.6rem;
  text-align: center;
  line-height: 150%;
  border: 0.1rem solid #589bff;
  color: #589bff;
  background: white;
`;
