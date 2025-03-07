import "./App.css";
import { useEffect } from "react";
import { useSnackbar } from "notistack";
import {
  Button,
  Flex,
  Layout,
  Input,
  Select,
  Typography,
  InputNumber,
  Avatar,
  Row,
  Col,
  Popconfirm,
} from "antd";
import taggedLogo from "./assests/tagged-logo.png";
import { GamePanel } from "./components/GamePanel";
import { paymentOpts } from "./utils/utils";
import { useTaggedApp } from "./hooks/useTaggedApp";
/**
 * What do we want to do?
 * I want to input what I am willing to pay for gold for tagged
 * via the side market games.
 * I want to see how much of a better deal I am getting instead of going through tagged
 *
 * so I want to input a number like 5$ and input the amount of gold I would get for it
 * and see how much more percent I would get paying at the normal web price point and ascending points
 *
 * ok next I want to be able to save some results or notes about a game
 *
 *
 * first lets fix our utils file so we can export constants
 */

const layoutStyle = {
  borderRadius: 8,
  overflow: "hidden",
  width: "calc(80% - 8px)",
  maxWidth: "calc(80% - 3px)",
  display: "flex",
  justifySelf: "center",
  marginTop: "6rem",
  // justifyContent: "center",
  // minWidth: "900px",
};

const headerStyle = {
  textAlign: "center",
  color: "#fff",
  height: 64,
  paddingInline: 48,
  lineHeight: "64px",
  backgroundColor: "#4096ff",
};

function App() {
  const {
    goldOwed,
    cashPayment,
    gameName,
    daysTillExpired,
    allGames,
    gameDetails,
    fetchGames,
    handleTempRes,
    handleCheck,
    handleSave,
    clearDb,
    setGoldOwed,
    setCashPayment,
    setGameName,
    setDaysTillExpired,
    setGameDetails,
    handleEdit,
    handleDelete,
  } = useTaggedApp();
  const { enqueueSnackbar } = useSnackbar();
  const { Header, Content } = Layout;

  useEffect(() => {
    fetchGames();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * next we create a results panel that takes partial game data
   * function calculateGoldMultiplier(payment, goldOwed, gameName) {
   * What is required is the payment, goldOwed, to display the
   * preview result string
   *
   * this component will have the preview state and the completed states
   * preview: payment, goldOwed
   * completed: ...preview, gameName, daysTillExp, notes
   *
   *  but ill rewrite this in ant design for now
   */
  return (
    <Layout style={layoutStyle}>
      <Header style={headerStyle}>
        <Avatar src={taggedLogo} />
        Tagged Deals
      </Header>
      <Content>
        <Row gutter={16} justify="space-around">
          <Col className="intake-container" md={10}>
            <Flex justify="space-between">
              <Typography.Text type="primary">Payment</Typography.Text>
              <Select
                style={{
                  minWidth: "60px",
                }}
                size="small"
                value={cashPayment}
                onChange={setCashPayment}
                options={paymentOpts}
              />
            </Flex>

            <Flex justify="space-between">
              <Typography.Text>How much you getting for that?</Typography.Text>
              <InputNumber
                value={goldOwed}
                onChange={setGoldOwed}
                size="small"
              />
            </Flex>
            <Popconfirm
              placement="top"
              title="Worth?"
              description={handleTempRes()}
              showCancel={false}
              okText="Type Shit"
            >
              <Button
                disabled={!goldOwed || goldOwed < 1}
                type="primary"
                size="small"
                className="worth-btn align-end"
                onClick={() =>
                  handleCheck(
                    enqueueSnackbar("Add Gold Owed", { variant: "error" })
                  )
                }
              >
                Check If Its Worth
              </Button>
            </Popconfirm>

            <Flex justify="space-between">
              <Typography.Text>Game Name</Typography.Text>
              <Input
                style={{ maxWidth: "250px" }}
                size="small"
                value={gameName}
                onChange={(e) => setGameName(e.target.value)}
              />
            </Flex>
            <Flex justify="space-between">
              <Typography.Text>Days till Expired</Typography.Text>
              <InputNumber
                onChange={setDaysTillExpired}
                value={daysTillExpired}
                size="small"
              />
            </Flex>
            <Flex justify="space-between">
              <Typography.Text>Details</Typography.Text>
              <Input.TextArea
                rows={3}
                onChange={(e) => setGameDetails(e.target.value)}
                value={gameDetails}
                style={{ maxWidth: "250px" }}
              />
            </Flex>
            <Button
              type="primary"
              className="worth-btn align-end"
              onClick={() => handleSave(enqueueSnackbar)}
            >
              Save
            </Button>
            <Button onClick={clearDb}>Clear DB</Button>
          </Col>
          {allGames.length ? (
            <Col className="intake-container" sm={12}>
              {allGames.map((game) => {
                return (
                  <GamePanel
                    id={game?.id}
                    gameName={game?.name}
                    results={game?.results}
                    details={game?.details}
                    daysTillExp={game?.daysTillExp}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                  />
                );
              })}
            </Col>
          ) : null}
        </Row>
      </Content>
    </Layout>
  );
}

export default App;
