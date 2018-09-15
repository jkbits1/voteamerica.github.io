// Generated by BUCKLESCRIPT VERSION 4.0.5, PLEASE EDIT WITH CARE
'use strict';

var $$Array = require("bs-platform/lib/js/array.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var ReasonReact = require("reason-react/src/ReasonReact.js");
var Js_primitive = require("bs-platform/lib/js/js_primitive.js");
var Table$VoteUSReason = require("./Table.bs.js");

var component = ReasonReact.statelessComponent("Matches");

var tableType = "matches";

var matchTableCol1 = {
  Header: "First Name",
  accessor: "RiderFirstName"
};

var matchTableCol2 = {
  Header: "Email",
  accessor: "RiderEmail"
};

var matchTableCol3 = {
  Header: "Last Name",
  accessor: "RiderLastName"
};

var matchTableColumns = /* array */[
  {
    Header: "uuid",
    accessor: "UUID"
  },
  matchTableCol1,
  matchTableCol2,
  matchTableCol3,
  {
    Header: "Phone",
    accessor: "RiderPhone"
  },
  {
    Header: "Collection ZIP",
    accessor: "RiderCollectionZIP"
  },
  {
    Header: "Dropoff ZIP",
    accessor: "RiderDropOffZIP"
  },
  {
    Header: "Created",
    accessor: "created_ts"
  },
  {
    Header: "Updated",
    accessor: "last_updated_ts"
  },
  {
    Header: "Status",
    accessor: "status"
  },
  {
    Header: "Org",
    accessor: "uuid_organization"
  }
];

function tableMatch(itemDetails) {
  return {
          UUID: itemDetails.UUID,
          RiderFirstName: itemDetails.RiderFirstName,
          RiderEmail: itemDetails.RiderEmail,
          RiderLastName: itemDetails.RiderLastName,
          RiderPhone: itemDetails.RiderPhone,
          RiderCollectionZIP: itemDetails.RiderCollectionZIP,
          RiderDropOffZIP: itemDetails.RiderDropOffZIP,
          created_ts: itemDetails.created_ts,
          last_updated_ts: itemDetails.last_updated_ts,
          status: itemDetails.status,
          uuid_organization: itemDetails.uuid_organization
        };
}

function make(loginInfo, apiInfo, matchesInfo, getMatchesList, hideMatchesList, showCurrentMatch, hideCurrentMatch, _) {
  var matchesTdPropsHandler = function (_, rowInfoOption, _$1, _$2) {
    return {
            onClick: (function (_, handleOriginalOption) {
                if (rowInfoOption !== undefined) {
                  var rowInfo = Js_primitive.valFromOption(rowInfoOption);
                  console.log(rowInfo);
                  var sr = function (fx,itemDetails){{ fx(itemDetails); return 0; }};
                  var itemDetails = rowInfo.original;
                  var currentMatch = tableMatch(itemDetails);
                  sr(showCurrentMatch, Js_primitive.some(currentMatch));
                } else {
                  Curry._1(hideCurrentMatch, /* () */0);
                }
                if (handleOriginalOption !== undefined) {
                  Curry._1(handleOriginalOption, /* () */0);
                }
                return /* () */0;
              })
          };
  };
  var handleGetMatchListClick = function () {
    var token = loginInfo.token;
    var url = apiInfo.apiUrl;
    var gl = function (fx,url,token){{ fx(url, token); return 0; }};
    gl(getMatchesList, url, token);
    return /* () */0;
  };
  var handleHideMatchListClick = function () {
    Curry._1(hideMatchesList, /* () */0);
    return /* () */0;
  };
  return /* record */[
          /* debugName */component[/* debugName */0],
          /* reactClassInternal */component[/* reactClassInternal */1],
          /* handedOffState */component[/* handedOffState */2],
          /* willReceiveProps */component[/* willReceiveProps */3],
          /* didMount */component[/* didMount */4],
          /* didUpdate */component[/* didUpdate */5],
          /* willUnmount */component[/* willUnmount */6],
          /* willUpdate */component[/* willUpdate */7],
          /* shouldUpdate */component[/* shouldUpdate */8],
          /* render */(function () {
              var tableMatches = $$Array.map(tableMatch, matchesInfo.matches);
              var tableDivStyle = {
                marginTop: "20px",
                marginBottom: "10px"
              };
              var currentMatchInfo = function (currentMatch) {
                return React.createElement("div", undefined, React.createElement("h3", undefined, "Current match info:"), React.createElement("div", undefined, currentMatch.RiderFirstName + (" " + currentMatch.RiderLastName)), React.createElement("div", undefined, currentMatch.RiderEmail));
              };
              var tableMatchesJSX;
              if (matchesInfo.showMatchList) {
                var match = matchesInfo.showCurrentMatchDetails;
                tableMatchesJSX = React.createElement("div", undefined, React.createElement("button", {
                          className: "button button--large",
                          id: "hideGetMatchList",
                          onClick: handleHideMatchListClick
                        }, "Hide List"), React.createElement("div", {
                          style: tableDivStyle
                        }, ReasonReact.element(undefined, undefined, Table$VoteUSReason.make((function (prim, prim$1, prim$2, prim$3, prim$4, prim$5) {
                                    return {
                                            className: prim,
                                            type: prim$1,
                                            columns: prim$2,
                                            defaultPageSize: prim$3,
                                            data: prim$4,
                                            getTdProps: prim$5
                                          };
                                  }), "basicMatchTable", tableType, matchTableColumns, tableMatches, matchesTdPropsHandler, /* array */[]))), match ? currentMatchInfo(matchesInfo.currentMatch) : React.createElement("div", undefined, "No match selected"));
              } else {
                tableMatchesJSX = React.createElement("div", undefined, React.createElement("button", {
                          className: "button button--large",
                          id: "showGetMatchList",
                          onClick: handleGetMatchListClick
                        }, "Show Matches List"));
              }
              var matchesInfoArea = loginInfo.loggedIn ? React.createElement("div", undefined, React.createElement("h2", {
                          className: "operator-page-heading"
                        }, "Matches Info"), React.createElement("div", undefined, tableMatchesJSX)) : null;
              return React.createElement("div", undefined, matchesInfoArea);
            }),
          /* initialState */component[/* initialState */10],
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */component[/* reducer */12],
          /* jsElementWrapped */component[/* jsElementWrapped */13]
        ];
}

var $$default = ReasonReact.wrapReasonForJs(component, (function (jsProps) {
        return make(jsProps.loginInfo, jsProps.apiInfo, jsProps.matchesInfo, jsProps.getMatchesList, jsProps.hideMatchesList, jsProps.showCurrentMatch, jsProps.hideCurrentMatch, /* array */[]);
      }));

exports.component = component;
exports.tableType = tableType;
exports.matchTableCol1 = matchTableCol1;
exports.matchTableCol2 = matchTableCol2;
exports.matchTableCol3 = matchTableCol3;
exports.matchTableColumns = matchTableColumns;
exports.tableMatch = tableMatch;
exports.make = make;
exports.$$default = $$default;
exports.default = $$default;
exports.__esModule = true;
/* component Not a pure module */