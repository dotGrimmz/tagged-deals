import "./GamePanel.css";
import {
  Card,
  Row,
  Col,
  Typography,
  Divider,
  theme,
  Button,
  Popconfirm,
} from "antd";
import { calculateGoldMultiplier } from "../utils/utils";
import { differenceInDays } from "date-fns";

/**
 *
 * What do I want to display in the card ?
 * Game name as title
 *
 * Result string
 *
 * Days left till exp
 *
 * {
    name: "test game name",
    results: {
      10: 52021,
    },
    details: "test note",
    daysTillExp: 30,
  },

  we will just do the result string, days till exp
  details if any

  title
  mapped out result strings
  notes display if any
 */
export const GamePanel = ({ handleEdit, id, handleDelete, game }) => {
  if (!game) {
    return;
  }
  const { name, results, details, daysTillExp, createdAt, expiryDate } = game;

  const { token } = theme.useToken();

  const [payment, goldOwed] = Object.entries(results)[0];
  const { resultStr } = calculateGoldMultiplier(payment, goldOwed, name);
  // const testDate = addDays(Date.now(), 8);
  const daysLeft = differenceInDays(expiryDate, Date.now());
  console.log({
    name,
    results,
    details,
    daysTillExp,
    id,
    createdAt,
    expiryDate,
    daysLeft,
  });
  const CardHeader = () => {
    return (
      <Row justify="space-between">
        <Col>{name}</Col>
        <Col
          style={{
            display: "flex",
            gap: "2px",
          }}
        >
          <Button onClick={() => handleEdit(id)} size="small">
            Edit
          </Button>
          <Popconfirm
            placement="top"
            onConfirm={() => handleDelete(id)}
            title={`Are you sure you want to delete ${name}`}
          >
            <Button size="small">Delete</Button>
          </Popconfirm>
        </Col>
      </Row>
    );
  };
  return (
    <Card title={<CardHeader />} className="custom-card">
      <Row justify="space-between">
        <Col>
          <Typography.Text>{resultStr}</Typography.Text>
        </Col>
      </Row>
      <Divider
        style={{
          marginTop: "2px",
          marginBottom: "2px",
          borderColor: token.colorPrimary,
        }}
      >
        <Typography.Text> Days till exp: {daysLeft}</Typography.Text>
      </Divider>
    </Card>
  );
};
