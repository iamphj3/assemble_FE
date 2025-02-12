import { IcEmpty, IcLeftBtn, IcProfile, IcRightBtn } from '../../assets/icons';
import React, { useEffect, useState } from 'react';

import Nav from '../common/Nav';
import { getPromiseListByUserId } from '../../lib/promise';
import styled from 'styled-components';

const CONTENTS = [
  '🎳 왕십리에서 볼링 한 판?',
  '🧗 요즘 대세는 클라이밍!',
  '🕵🏻 매일 가는 카페가 지루하다면 방탈출',
  '🥾 요즘 같은 날씨에는 등산이지~',
  '🏊🏻‍♂️ 한강 수영장 개장! 물놀이 가자~',
];

const home = () => {
  let now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth() + 1;

  const userId = localStorage.getItem('userId');
  const [promiseList, setPromiseList] = useState([]);

  const getPromiseList = async () => {
    const promises = await getPromiseListByUserId(userId);
    const promise = promises.promises.map((item) => item.promise);

    setPromiseList(promise);
  };

  useEffect(() => {
    const fetchData = async () => {
      await getPromiseList();
    };

    fetchData();
  }, []);

  const [todaysPromise, setTodaysPromise] = useState(0);
  const [contentIndex, setContentIndex] = useState(0);

  const handleLeftButtonClick = () => {
    setContentIndex((prevIndex) => (prevIndex === 0 ? CONTENTS.length - 1 : prevIndex - 1));
  };

  const handleRightButtonClick = () => {
    setContentIndex((prevIndex) => (prevIndex === CONTENTS.length - 1 ? 0 : prevIndex + 1));
  };

  const checkIfToday = (dateString) => {
    const date = new Date(dateString);
    if (date.toDateString() === now.toDateString()) {
      setTodaysPromise((prev) => prev + 1);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' });
    return formattedDate;
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const formattedTime = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    return formattedTime;
  };

  useEffect(() => {
    if (promiseList.length > 0) {
      promiseList.forEach((promise) => {
        checkIfToday(promise.promiseStartDate);
      });
    }
  }, [promiseList]);

  return (
    <>
      <Container>
        <div className='main'>
          <div className='profile'>
            <IcProfile />
            <p>{userId}</p>
          </div>
          <div className='today'>
            <p>오늘의 약속</p>
            <span>{todaysPromise}</span>
          </div>
          <MonthList>
            <MonthInfo>
              <p>
                {year}년 {month}월
              </p>
              <div>
                <IcLeftBtn />
                <IcRightBtn />
              </div>
            </MonthInfo>
            <StPromiseList>
              {promiseList.length > 0 ? (
                promiseList.map((promise) => (
                  <PromiseItem key={promise?._id}>
                    <p>
                      <span>{formatDate(promise?.promiseStartDate)}</span>
                      {promise?.promiseName}
                    </p>
                    <span>{formatTime(promise?.promiseStartDate)}</span>
                  </PromiseItem>
                ))
              ) : (
                <StEmpty>
                  <IcEmpty />
                </StEmpty>
              )}
            </StPromiseList>
          </MonthList>
          <Contents>
            <div>
              <p>컨텐츠 추천</p>
              <div>
                <IcLeftBtn onClick={handleLeftButtonClick} />
                <IcRightBtn onClick={handleRightButtonClick} />
              </div>
            </div>
            <p>{CONTENTS[contentIndex]}</p>
          </Contents>
        </div>
        <StNavWrapper>
          <Nav />
        </StNavWrapper>
      </Container>
    </>
  );
};

export default home;

const StEmpty = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  & > svg {
    margin-left: 2.1rem;
    height: 14rem;
  }
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 100vh;

  background-color: ${({ theme }) => theme.colors.Grey200};
  box-shadow: 0.5rem #f7f7f8;

  & > .main {
    padding: 0 2rem;

    & > .profile {
      margin-top: 6rem;
      margin-bottom: 2rem;
      display: flex;
      flex-wrap: wrap;
      & > p {
        margin-left: 2rem;
        color: black;
        font-family: 'Pretendard';
        font-weight: 600;
        font-size: 1.8rem;
        line-height: 188%;
      }
    }
    & > .today {
      width: 100%;
      height: 6rem;
      display: flex;
      flex-wrap: wrap;

      background-color: white;
      box-shadow: 0.1rem 0.1rem 0.5rem 0.1rem #e8eaed;
      border-radius: 1.2rem;

      & > p {
        padding: 1.5rem 0rem 1.5rem 2rem;
        color: black;
        font-family: 'Pretendard';
        font-weight: 600;
        font-size: 1.8rem;
        line-height: 148%;
      }
      & > span {
        width: 2.7rem;
        height: 1.8rem;
        padding: 1.5rem;
        border-radius: 0.1rem;

        color: ${({ theme }) => theme.colors.Blue};
        font-family: 'Pretendard';
        font-weight: 600;
        font-size: 1.8rem;
        line-height: 148%;
      }
      & > span::after {
        width: 2.7rem;
        height: 1.8rem;
        border-radius: 0.1rem;
        background-color: ${({ theme }) => theme.colors.Blue};
        opacity: 0.2;
      }
    }
  }
`;

const MonthList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 21.5rem;
  margin-top: 2rem;

  background-color: white;
  box-shadow: 0.1rem 0.1rem 0.5rem 0.1rem #e8eaed;
  border-radius: 1.2rem;

  & > svg {
    margin-bottom: 2.2rem;
  }
`;

const MonthInfo = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
  padding: 2rem 2rem 2rem 2rem;

  & > p {
    padding: 0rem 2.1rem;
    font-family: 'Pretendard';
    font-weight: 600;
    font-size: 1.8rem;
  }
  & > div {
    padding: 0rem 2.1rem;
  }
  & > div > svg {
    margin-left: 0.6rem;
    cursor: pointer;
  }
`;

const StPromiseList = styled.ul`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  gap: 1.9rem;

  width: 100%;
  height: 15rem;
  padding: 0rem 2.1rem;

  color: black;
  font-family: 'Pretendard';

  & > li:last-child {
    margin-bottom: 2rem;
  }
`;

const PromiseItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 0rem 2.1rem;

  & > * {
    font-family: 'Pretendard';
    font-size: 1.4rem;
  }

  & > p {
    font-weight: 500;
  }

  & > p > span {
    margin-right: 1.9rem;
    font-weight: 600;
    font-size: 1.4rem;

    color: ${({ theme }) => theme.colors.Blue};
  }

  & > span:last-child {
    font-weight: 500;
    color: ${({ theme }) => theme.colors.Grey400};
  }
`;

const Contents = styled.div`
  width: 100%;
  height: 11.5rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 2rem;

  background-color: white;
  box-shadow: 0.1rem 0.1rem 0.5rem 0.1rem #e8eaed;
  border-radius: 1.2rem;
  & > div {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 2rem 2rem 0.5rem 2rem;

    & > p {
      width: 20rem;
      color: black;
      font-family: 'Pretendard';
      font-weight: 600;
      font-size: 1.8rem;
      line-height: 148%;
    }
    & > div {
      & > svg {
        width: 2rem;
        height: 2rem;
        margin-left: 0.6rem;

        cursor: pointer;
      }
    }
  }
  & > svg {
    position: relative;
    top: -1.5rem;
    left: 2rem;
  }
  & > p {
    padding: 0 2rem 2rem 2rem;
    color: black;
    font-family: 'Pretendard';
    font-weight: 400;
    font-size: 1.5rem;
    line-height: 148%;
  }
`;

const StNavWrapper = styled.div`
  position: fixed;
  bottom: 0;
`;
