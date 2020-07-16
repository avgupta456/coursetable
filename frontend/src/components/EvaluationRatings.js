import React from 'react';
import { Row, Col } from 'react-bootstrap';
import styles from './EvaluationRatings.module.css';
import RatingsGraph from './RatingsGraph';

const EvaluationRatings = (props) => {
  const info = props.info;
  let ratings = [];
  info.forEach((section) => {
    const temp = section.course.evaluation_ratings;
    for (let i = 0; i < temp.length; i++) {
      if (!ratings[i])
        ratings.push({
          question: temp[i].evaluation_question.question_text,
          values: [],
        });
      if (!ratings[i].values.length) {
        for (let j = 0; j < temp[i].rating.length; j++) {
          ratings[i].values.push(temp[i].rating[j]);
        }
      } else {
        for (let j = 0; j < ratings[i].values.length; j++) {
          ratings[i].values[j] += temp[i].rating[j];
        }
      }
    }
  });
  const num_questions = ratings.length;
  let assessment = [];
  let workload = [];
  let engagement = [];
  let organized = [];
  let feedback = [];
  let challenge = [];
  let major = [];
  ratings.forEach((rating) => {
    if (rating.question.includes('assessment')) assessment = rating.values;
    else if (rating.question.includes('workload')) workload = rating.values;
    else if (rating.question.includes('engagement')) engagement = rating.values;
    else if (rating.question.includes('organized')) organized = rating.values;
    else if (rating.question.includes('feedback')) feedback = rating.values;
    else if (rating.question.includes('challenge')) challenge = rating.values;
    else if (rating.question.includes('major')) major = rating.values;
  });

  return (
    <div>
      <Row className="m-auto pl-1">
        <strong>Overall</strong>
      </Row>
      <RatingsGraph ratings={assessment} reverse={false} />
      <Row className="m-auto pl-1">
        <strong>Workload</strong>
      </Row>
      <RatingsGraph ratings={workload} reverse={true} />
      {num_questions === 3 ? (
        <div>
          <Row className="m-auto pl-1">
            <strong>Relevant to Major</strong>
          </Row>

          <RatingsGraph ratings={major} reverse={false} />
        </div>
      ) : (
        <div>
          <Row className="m-auto pl-1">
            <strong>Engagement</strong>
          </Row>
          <RatingsGraph ratings={engagement} reverse={false} />
          <Row className="m-auto pl-1">
            <strong>Organization</strong>
          </Row>
          <RatingsGraph ratings={organized} reverse={false} />
          <Row className="m-auto pl-1">
            <strong>Feedback Clarity</strong>
          </Row>
          <RatingsGraph ratings={feedback} reverse={false} />
          <Row className="m-auto pl-1">
            <strong>Intellectual Challenge</strong>
          </Row>
          <RatingsGraph ratings={challenge} reverse={false} />
        </div>
      )}
    </div>
  );
};

export default EvaluationRatings;