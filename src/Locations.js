import React, { Component } from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import Post from './Post';

class Locations extends Component {

    constructor(props) {
        super(props);
        this.state = {
            locations: [
                {
                    "title": "",
                    "subtitle": "",
                    "metatitle": "",
                    "images": [
                        {
                            "location": "",
                            "title": "",
                            "alt": ""
                        }
                    ]
                }
            ]
        }
    }

    componentWillMount() {
        fetch('data/locations.json')
            .then(response => response.json())
            .then(json => this.setState({ locations: json }));
    }

    render() {
        return (
            <Container>
                <Row className="justify-content-center">
                    <Col lg={8} md={10}>
                        <h1>Locations</h1>
                    </Col>
                </Row>
                {this.state.locations.map((location, i) => {
                    return (
                        <Post key={i} title={location.title} subtitle={location.subtitle} metatitle={location.metatitle} images={location.images} />
                    );
                })}
            </Container>
        );
        {/* 
                <div className="row justify-content-center">
                    <div className="col-lg-8 col-md-10">
                        <div className="post-preview">
                            <h2 className="post-title">
                                2012
                    </h2>
                            <h3 className="post-subtitle">
                                Devil's Head - Merrimac, Wisconsin
                    </h3>
                            <p className="post-meta">
                                <u>Awards</u><br /> Most Pars - Kyle Burritt <br /> Most Bogeys - Clint Delee
                    </p>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row justify-content-center">
                    <div className="col-lg-8 col-md-10">
                        <div className="post-preview">
                            <h2 className="post-title">
                                2013
                    </h2>
                            <h3 className="post-subtitle">
                                Swan Lake Resort - Plymouth, Indiana
                    </h3>
                            <p className="post-meta">
                                <u>Awards</u><br /> Low Round - Kevin Eck <br /> Most Pars - Kevin Eck <br /> Most Bogeys - Owen Burritt
                    </p>
                            <p className="post-meta"></p>
                            <div className="location-gallery">
                                <a href="img/full/swan_lake_2013.jpg"
                                    title="(L to R) Owen Burritt, Jacob Riebe, Nat DeRose, Brian Zimmerman, Clint Delee, Dave Kakareka, Kyle Burritt, Kevin Eck">
                                    <img className="head" src="./img/full/swan_lake_2013.jpg" alt="Swan Lake 2013" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row justify-content-center">
                    <div className="col-lg-8 col-md-10">
                        <div className="post-preview">
                            <h2 className="post-title">
                                2014
                    </h2>
                            <h3 className="post-subtitle">
                                Birck Boilermaker Golf Complex at Purdue University - West Lafayette, Indiana
                    </h3>
                            <p className="post-meta">
                                <u>Summary</u><br /> The players, as I recall, generally enjoyed the courses at Purdue University. The
                                Kampen is a Pete Dye designed links style course with plenty of danger areas to avoid. Ackerman
                                Hills
                                is an old wooded American style course with lots of hills. One hole even has a bell at the bottom
                                of a hill to let the tee box know that current group on the fairway has cleared. The players stayed
                                at a Courtyard, dined at Hooters and enjoyed many adult beverages.
                    </p>
                            <p className="post-meta">
                                <u>Awards</u><br /> The Burritt Cup - Clint Delee, Nat DeRose, Jason Lane, Kyle Burritt <br /> Low Round
                        - Clint Delee <br /> Most Pars - Clint Delee <br /> Most Bogeys - Owen Burritt <br /> Most Hazards - Nat
                        DeRose <br /> High Round - Dan Halverson
                    </p>
                            <p className="post-meta">
                                <u>Photo Gallery</u>
                            </p>
                            <div className="location-gallery">
                                <a href="img/full/purdue_2014_1.jpg"
                                    title="(L to R) Dan Halverson, Nat DeRose, Jacob Riebe, Clint Delee, Jason Lane, Owen Burritt, Kyle Burritt, Dave Kakareka">
                                    <img className="head" src="./img/full/purdue_2014_1.jpg" alt="Purdue 1" />
                                </a>
                                <a href="img/full/purdue_2014_2.jpg"
                                    title="(L to R)  Nat DeRose, Clint Delee, Kyle Burritt, Jason Lane">
                                    <img className="head" src="./img/full/purdue_2014_2.jpg" alt="Purdue 2" />
                                </a>
                                <a href="img/full/purdue_2014_3.jpg" title="Clint Delee">
                                    <img className="head" src="./img/full/purdue_2014_3.jpg" alt="Purdue 3" />
                                </a>
                                <a href="img/full/purdue_2014_4.jpg" title="Kyle Burritt">
                                    <img className="head" src="./img/full/purdue_2014_4.jpg" alt="Purdue 4" />
                                </a>
                                <a href="img/full/purdue_2014_5.jpg" title="Jason Lane">
                                    <img className="head" src="./img/full/purdue_2014_5.jpg" alt="Purdue 5" />
                                </a>
                                <a href="img/full/purdue_2014_6.jpg" title="Nat DeRose">
                                    <img className="head" src="./img/full/purdue_2014_6.jpg" alt="Purdue 6" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row justify-content-center">
                    <div className="col-lg-8 col-md-10">
                        <div className="post-preview">
                            <h2 className="post-title">
                                2015
                    </h2>
                            <h3 className="post-subtitle">
                                Coachman's Golf Resort - Edgerton, Wisconsin
                    </h3>
                            <p className="post-meta">
                                <u>Summary</u><br /> Coachman's is a unique resort in that the golf is good, but the accommodations
                                are
                                right from the '70s. Coachman's offers an on site bar and restaurant for dining. The golf package
                                included drink tickets and two dinner meals. The golfers never left the property as there isn't much
                                around Coachman's to get to! Kyle Burritt did make an early Saturday morning run to Dunkin Donuts
                                for the group though. Thanks, Kyle!
                    </p>
                            <p className="post-meta">
                                <u>Awards</u> <br /> The Burritt Cup - Kevin Eck, Jacob Riebe, Nat DeRose, Jason Lane <br /> Low Round -
                        Kevin Eck <br /> Most Pars - Kevin Eck <br /> Most Bogeys - Owen Burritt <br /> Most Hazards - Nat DeRose
                        <br /> High Round - Dan Halverson
                    </p>
                            <p className="post-meta">
                                <u>Photo Gallery</u>
                            </p>
                            <div className="location-gallery">
                                <a href="img/full/coachmans_2015_1.jpg"
                                    title="(L to R) Nat DeRose, Kyle Burritt, Owen Burritt, Jasob Riebe, Dan Halverson, Dave Kakareka, Jason Lane, Kevin Eck">
                                    <img className="head" src="./img/full/coachmans_2015_1.jpg" alt="Coachmans 2015 1" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row justify-content-center">
                    <div className="col-lg-8 col-md-10">
                        <div className="post-preview">
                            <h2 className="post-title">
                                2016
                    </h2>
                            <h3 className="post-subtitle">
                                Geneva National Resort - Lake Geneva, Wisconsin
                    </h3>
                            <p className="post-meta">
                                <u>Summary</u> <br /> The players really enjoyed the golf at this location. Accommodations were at the
                                swanky Ridge Hotel. All three courses at Geneva National offer many golf challenges. We dined at
                                Sprecher's and the hotel restaurant. On Friday, the group went out to enjoy Lake Geneva bars. During
                                Sunday's golf, a minor incident almost occurred. Dan Halverson had almost tipped a cart over in a
                                sand trap. He saved it with masterful skill and a strong left leg.
                    </p>
                            <p className="post-meta">
                                <u>Awards</u> <br /> The Burritt Cup - Clint Delee, Nat DeRose, Jason Lane <br /> Low Round - Kevin Eck
                        <br /> Most Pars - Kevin Eck <br /> Most Bogeys - Clint Delee <br /> Most Hazards - Nat DeRose <br /> High
                                                Round - Dan Halverson
                    </p>
                            <p className="post-meta">
                                <u>Photo Gallery</u>
                            </p>
                            <div className="location-gallery">
                                <a href="img/full/geneva_2016_1.jpg" title="A look out over the practice area from the clubhouse.">
                                    <img className="head" src="./img/full/geneva_2016_1.jpg" alt="Geneva 1" />
                                </a>
                                <a href="img/full/geneva_2016_2.jpg"
                                    title="(L to R) Clint Delee, Jacob Riebe, Jason Lane, Kyle Burritt, Owen Burritt, Nat DeRose  Enjoying a beer before the first round.">
                                    <img className="head" src="./img/full/geneva_2016_2.jpg" alt="Geneva 2" />
                                </a>
                                <a href="img/full/geneva_2016_3.jpg" title="Gotta make some putts!">
                                    <img className="head" src="./img/full/geneva_2016_3.jpg" alt="Geneva 3" />
                                </a>
                                <a href="img/full/geneva_2016_4.jpg"
                                    title="(L to R) Kevin Eck, Dave Kakareka, Nat DeRose, Dan Halverson, Clint Delee, Jacob Riebe, Owen Burritt, Jason Lane, Kyle Burritt">
                                    <img className="head" src="./img/full/geneva_2016_4.jpg" alt="Geneva 4" />
                                </a>
                                <a href="img/full/geneva_2016_5.jpg" title="Shockers and flappy birds, I guess...">
                                    <img className="head" src="./img/full/geneva_2016_5.jpg" alt="Geneva 5" />
                                </a>
                                <a href="img/full/geneva_2016_6.jpg" title="Clint is pondering the deeper questions in life.">
                                    <img className="head" src="./img/full/geneva_2016_6.jpg" alt="Geneva 6" />
                                </a>
                                <a href="img/full/geneva_2016_7.jpg" title="OMG!  It's a camera too!">
                                    <img className="head" src="./img/full/geneva_2016_7.jpg" alt="Geneva 7" />
                                </a>
                                <a href="img/full/geneva_2016_8.jpg" title="Jason Lane">
                                    <img className="head" src="./img/full/geneva_2016_8.jpg" alt="Geneva 8" />
                                </a>
                                <a href="img/full/geneva_2016_9.jpg" title="Kyle Burritt">
                                    <img className="head" src="./img/full/geneva_2016_9.jpg" alt="Geneva 9" />
                                </a>
                                <a href="img/full/geneva_2016_10.jpg" title="Owen Burritt">
                                    <img className="head" src="./img/full/geneva_2016_10.jpg" alt="Geneva 10" />
                                </a>
                                <a href="img/full/geneva_2016_11.jpg" title="Clint Delee">
                                    <img className="head" src="./img/full/geneva_2016_11.jpg" alt="Geneva 11" />
                                </a>
                                <a href="img/full/geneva_2016_12.jpg" title="Jacob Riebe">
                                    <img className="head" src="./img/full/geneva_2016_12.jpg" alt="Geneva 12" />
                                </a>
                                <a href="img/full/geneva_2016_13.jpg" title="Kevin Eck">
                                    <img className="head" src="./img/full/geneva_2016_13.jpg" alt="Geneva 13" />
                                </a>
                                <a href="img/full/geneva_2016_14.jpg" title="Nat DeRose">
                                    <img className="head" src="./img/full/geneva_2016_14.jpg" alt="Geneva 14" />
                                </a>
                                <a href="img/full/geneva_2016_15.jpg" title="Dave Kakareka">
                                    <img className="head" src="./img/full/geneva_2016_15.jpg" alt="Geneva 15" />
                                </a>
                                <a href="img/full/geneva_2016_16.jpg"
                                    title="2016 Burritt Cup Winners! (L to R) Jason Lane, Nat DeRose, Clint Delee">
                                    <img className="head" src="./img/full/geneva_2016_16.jpg" alt="Geneva 16" />
                                </a>
                                <a href="img/full/geneva_2016_17.jpg"
                                    title="Rules Committee hard at work tallying up the final individual results.">
                                    <img className="head" src="./img/full/geneva_2016_17.jpg" alt="Geneva 17" />
                                </a>
                                <a href="img/full/geneva_2016_18.jpg" title="Lunch on Sunday and awards">
                                    <img className="head" src="./img/full/geneva_2016_18.jpg" alt="Geneva 18" />
                                </a>
                                <a href="img/full/geneva_2016_19.jpg" title="Nat is super happy with his most hazards award.">
                                    <img className="head" src="./img/full/geneva_2016_19.jpg" alt="Geneva 19" />
                                </a>
                                <a href="img/full/geneva_2016_20.jpg" title="Lane's got some Cup Cash!">
                                    <img className="head" src="./img/full/geneva_2016_20.jpg" alt="Geneva 20" />
                                </a>
                                <a href="img/full/geneva_2016_21.jpg" title="Concentration ... (L to R) Twitter, Lunch, Scorecard">
                                    <img className="head" src="./img/full/geneva_2016_21.jpg" alt="Geneva 21" />
                                </a>
                                <a href="img/full/geneva_2016_22.jpg" title="">
                                    <img className="head" src="./img/full/geneva_2016_22.jpg" alt="Geneva 22" />
                                </a>
                                <a href="img/full/geneva_2016_23.jpg" title="Winner winner, chicken dinner (of what, I'm not sure)">
                                    <img className="head" src="./img/full/geneva_2016_23.jpg" alt="Geneva 23" />
                                </a>
                                <a href="img/full/geneva_2016_24.jpg" title="Toast to the victors!">
                                    <img className="head" src="./img/full/geneva_2016_24.jpg" alt="Geneva 24" />
                                </a>
                                <a href="img/full/geneva_2016_25.jpg" title="Kevin Eck, Most Pars and Lowest Round 2016 Winner">
                                    <img className="head" src="./img/full/geneva_2016_25.jpg" alt="Geneva 25" />
                                </a>
                                <a href="img/full/geneva_2016_26.jpg" title="Clint Delee, Most Bogies 2016 Winner">
                                    <img className="head" src="./img/full/geneva_2016_26.jpg" alt="Geneva 26" />
                                </a>
                                <a href="img/full/geneva_2016_27.jpg"
                                    title="2016 Cup Winners, (L to R) Jason Lane, Nat DeRose, Clint Delee">
                                    <img className="head" src="./img/full/geneva_2016_27.jpg" alt="Geneva 27" />
                                </a>
                                <a href="img/full/geneva_2016_28.jpg"
                                    title="I think they wanted a skate around the ice type of moment or something.">
                                    <img className="head" src="./img/full/geneva_2016_28.jpg" alt="Geneva 28" />
                                </a>
                                <a href="img/full/geneva_2016_29.jpg"
                                    title="Last shot of the players and awards.  Until next year...">
                                    <img className="head" src="./img/full/geneva_2016_29.jpg" alt="Geneva 29" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row justify-content-center">
                    <div className="col-lg-8 col-md-10">
                        <div className="post-preview">
                            <h2 className="post-title">
                                2017
                    </h2>
                            <h3 className="post-subtitle">
                                Swan Lake Resort - Plymouth, Indiana
                    </h3>
                            <p className="post-meta">
                                <u>Summary</u> <br /> As usual, another challenging golf course for this group. The quest for the cup
                                was played in a 4 - 3 format this year. A lot of balls were lost and a lot of fun was had. The group
                                stayed at the Fairway House which was, by far, the best accomodations yet. On Friday, we dined at
                                the famous Dickie's Bar and Grill. On Saturday, we brought enough food to feed Arnie's Army and ate
                                at the House. Lunch was at the sub-par Clubhouse Bar and Grill. We also introduced a new player to
                                the mix, Sean Smith.
                    </p>
                            <p className="post-meta">
                                <u>Awards</u> <br /> The Burritt Cup - Kyle Burritt, Jacob Riebe, Dan Halverson <br /> Low Round - Kyle
                        Burritt <br /> Most Pars - Owen Burritt <br /> Most Bogeys - Jacob Riebe <br /> Most Hazards - Sean
                                                Smith
                        <br /> High Round - Dan Halverson
                    </p>
                            <p className="post-meta">
                                <u>Photo Gallery</u>
                            </p>
                            <div className="location-gallery">
                                <a href="img/full/swan_lake_2017_1.jpg" title="Nat contemplating the finer things in life.">
                                    <img className="head" src="./img/full/swan_lake_2017_1.jpg" alt="Swan Lake 2017 1" />
                                </a>
                                <a href="img/full/swan_lake_2017_2.jpg" title="Owen... 'Where'd that ball go?''">
                                    <img className="head" src="./img/full/swan_lake_2017_2.jpg" alt="Swan Lake 2017 2" />
                                </a>
                                <a href="img/full/swan_lake_2017_3.jpg" title="Getting ready to start losing some golf balls.">
                                    <img className="head" src="./img/full/swan_lake_2017_3.jpg" alt="Swan Lake 2017 3" />
                                </a>
                                <a href="img/full/swan_lake_2017_4.jpg" title="The Fariway House from the driveway.">
                                    <img className="head" src="./img/full/swan_lake_2017_4.jpg" alt="Swan Lake 2017 4" />
                                </a>
                                <a href="img/full/swan_lake_2017_5.jpg" title="Kyle is measuring his shot">
                                    <img className="head" src="./img/full/swan_lake_2017_5.jpg" alt="Swan Lake 2017 5" />
                                </a>
                                <a href="img/full/swan_lake_2017_6.jpg" title="Good form on Dave">
                                    <img className="head" src="./img/full/swan_lake_2017_6.jpg" alt="Swan Lake 2017 6" />
                                </a>
                                <a href="img/full/swan_lake_2017_7.jpg" title="Now that's a fire...">
                                    <img className="head" src="./img/full/swan_lake_2017_7.jpg" alt="Swan Lake 2017 7" />
                                </a>
                                <a href="img/full/swan_lake_2017_8.jpg" title="Professional polish by Dave before Day 2">
                                    <img className="head" src="./img/full/swan_lake_2017_8.jpg" alt="Swan Lake 2017 8" />
                                </a>
                                <a href="img/full/swan_lake_2017_9.jpg" title="Before the morning round on Day 2">
                                    <img className="head" src="./img/full/swan_lake_2017_9.jpg" alt="Swan Lake 2017 9" />
                                </a>
                                <a href="img/full/swan_lake_2017_10.jpg" title="Nat's going through his tee box routine">
                                    <img className="head" src="./img/full/swan_lake_2017_10.jpg" alt="Swan Lake 2017 10" />
                                </a>
                                <a href="img/full/swan_lake_2017_11.jpg" title="Nice finish OB!">
                                    <img className="head" src="./img/full/swan_lake_2017_11.jpg" alt="Swan Lake 2017 11" />
                                </a>
                                <a href="img/full/swan_lake_2017_12.jpg"
                                    title="Nat looks like he's squeezing some golf between safaris">
                                    <img className="head" src="./img/full/swan_lake_2017_12.jpg" alt="Swan Lake 2017 12" />
                                </a>
                                <a href="img/full/swan_lake_2017_13.jpg" title="Dan and the Cup">
                                    <img className="head" src="./img/full/swan_lake_2017_13.jpg" alt="Swan Lake 2017 13" />
                                </a>
                                <a href="img/full/swan_lake_2017_14.jpg" title="Jake and the Cup">
                                    <img className="head" src="./img/full/swan_lake_2017_14.jpg" alt="Swan Lake 2017 14" />
                                </a>
                                <a href="img/full/swan_lake_2017_15.jpg"
                                    title="Burrit Cup winning hardware.  It's rarely all in the same spot at the same time.">
                                    <img className="head" src="./img/full/swan_lake_2017_15.jpg" alt="Swan Lake 2017 15" />
                                </a>
                                <a href="img/full/swan_lake_2017_18.jpg" title="2017 Crew shot">
                                    <img className="head" src="./img/full/swan_lake_2017_18.jpg" alt="Swan Lake 2017 18" />
                                </a>
                                <a href="img/full/swan_lake_2017_21.jpg" title="Low Round winner Kyle Burritt">
                                    <img className="head" src="./img/full/swan_lake_2017_21.jpg" alt="Swan Lake 2017 21" />
                                </a>
                                <a href="img/full/swan_lake_2017_22.jpg" title="Most Pars winner Owen Burritt">
                                    <img className="head" src="./img/full/swan_lake_2017_22.jpg" alt="Swan Lake 2017 22" />
                                </a>
                                <a href="img/full/swan_lake_2017_23.jpg" title="High Round winner Dan Halverson">
                                    <img className="head" src="./img/full/swan_lake_2017_23.jpg" alt="Swan Lake 2017 23" />
                                </a>
                                <a href="img/full/swan_lake_2017_24.jpg" title="Most Bogies winner Jacob Riebe">
                                    <img className="head" src="./img/full/swan_lake_2017_24.jpg" alt="Swan Lake 2017 24" />
                                </a>
                                <a href="img/full/swan_lake_2017_25.jpg"
                                    title="We are the Champions!  Jacob Riebe, Dan Halverson and Kyle Burritt">
                                    <img className="head" src="./img/full/swan_lake_2017_25.jpg" alt="Swan Lake 2017 25" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row justify-content-center">
                    <div className="col-lg-8 col-md-10">
                        <div className="post-preview">
                            <h2 className="post-title">
                                2018
                    </h2>
                            <h3 className="post-subtitle">
                                Lake Lawn Lodge - Delavan, WI (lodging and Friday Round) <br />
                                Hawk's View - Lake Geneva, WI (morning round Saturday) <br />
                                Barn Hollow - Lake Geneva, WI (Burritt Cup championship round) <br />
                                Abbey Springs - Fontana, WI (morning round Sunday) <br />
                            </h3>
                            <p className="post-meta">
                                <u>Summary</u> <br /> This was definitely a banner year for the Burritt Cup. The players played at
                                four
                                distinct courses, the Burritt Cup round was played on a Par 3 course and three new players were
                                added to the roster!
                    </p>
                            <p className="post-meta">
                                <u>Awards</u>
                                <br /> The Burritt Cup - Clint Delee, Jacob Riebe, Dave Kakareka <br /> Low Round - Kevin Eck <br /> Most
                        Pars - Kyle Burritt <br /> Most Bogeys - Jacob Riebe <br />
                                High Round - Mike Robey
                    </p>
                            <p className="post-meta">
                                <u>Photo Gallery</u>
                            </p>
                            <div className="location-gallery">
                                <a href="img/full/lake_lawn_2018_01.jpg" title="Jim is working his pool game on the green ?!?">
                                    <img className="head" src="./img/full/lake_lawn_2018_01.jpg" alt="Lake Lawn 2018 1" />
                                </a>
                                <a href="img/full/lake_lawn_2018_02.jpg" title="A view of one of the Abbey Spring's course holes.">
                                    <img className="head" src="./img/full/lake_lawn_2018_02.jpg" alt="Lake Lawn 2018 2" />
                                </a>
                                <a href="img/full/lake_lawn_2018_03.jpg" title="Kyle Burritt and Jake Riebe with the pose.">
                                    <img className="head" src="./img/full/lake_lawn_2018_03.jpg" alt="Lake Lawn 2018 3" />
                                </a>
                                <a href="img/full/lake_lawn_2018_04.jpg" title="A view of one of the Lake Lawn courses holes.">
                                    <img className="head" src="./img/full/lake_lawn_2018_04.jpg" alt="Lake Lawn 2018 4" />
                                </a>
                                <a href="img/full/lake_lawn_2018_05.jpg" title="Looking out over Lake Geneva at night with the moon providing some light.">
                                    <img className="head" src="./img/full/lake_lawn_2018_05.jpg" alt="Lake Lawn 2018 5" />
                                </a>
                                <a href="img/full/lake_lawn_2018_06.jpg" title="This year's group.">
                                    <img className="head" src="./img/full/lake_lawn_2018_06.jpg" alt="Lake Lawn 2018 6" />
                                </a>
                                <a href="img/full/lake_lawn_2018_07.jpg" title="Good form by Kyle Burritt">
                                    <img className="head" src="./img/full/lake_lawn_2018_07.jpg" alt="Lake Lawn 2018 7" />
                                </a>
                                <a href="img/full/lake_lawn_2018_08.jpg" title="Clint Delee ready to send it.">
                                    <img className="head" src="./img/full/lake_lawn_2018_08.jpg" alt="Lake Lawn 2018 8" />
                                </a>
                                <a href="img/full/lake_lawn_2018_09.jpg" title="Dave Kakareka in his finish pose.">
                                    <img className="head" src="./img/full/lake_lawn_2018_09.jpg" alt="Lake Lawn 2018 9" />
                                </a>
                                <a href="img/full/lake_lawn_2018_10.jpg" title="A look from our suite balcony to Lake Geneva.">
                                    <img className="head" src="./img/full/lake_lawn_2018_10.jpg" alt="Lake Lawn 2018 10" />
                                </a>
                                <a href="img/full/lake_lawn_2018_11.jpg" title="Deep thoughts ... with (l to r) Dave Kakareka, Owen Burritt, Jake Riebe and Kyle Burritt">
                                    <img className="head" src="./img/full/lake_lawn_2018_11.jpg" alt="Lake Lawn 2018 11" />
                                </a>
                                <a href="img/full/lake_lawn_2018_12.jpg" title="Kevin Eck workin' the flat stick before our first round.">
                                    <img className="head" src="./img/full/lake_lawn_2018_12.jpg" alt="Lake Lawn 2018 12" />
                                </a>
                                <a href="img/full/lake_lawn_2018_13.jpg" title="Pre round chit chat (l to r) Jim Kopitke, Clint Delee, Justin Niekamp, Sean Smith, and Mike Robey">
                                    <img className="head" src="./img/full/lake_lawn_2018_13.jpg" alt="Lake Lawn 2018 13" />
                                </a>
                                <a href="img/full/lake_lawn_2018_14.jpg" title="Tee it up!">
                                    <img className="head" src="./img/full/lake_lawn_2018_14.jpg" alt="Lake Lawn 2018 14" />
                                </a>
                                <a href="img/full/lake_lawn_2018_15.jpg" title="Friday dinner at Gordy's Boat House">
                                    <img className="head" src="./img/full/lake_lawn_2018_15.jpg" alt="Lake Lawn 2018 15" />
                                </a>
                                <a href="img/full/lake_lawn_2018_16.jpg" title="Jim's Best Centerfold pose ... He's much better at golf">
                                    <img className="head" src="./img/full/lake_lawn_2018_16.jpg" alt="Lake Lawn 2018 16" />
                                </a>
                                <a href="img/full/lake_lawn_2018_17.jpg" title="Como Crossings course at Hawk's View">
                                    <img className="head" src="./img/full/lake_lawn_2018_17.jpg" alt="Lake Lawn 2018 17" />
                                </a>
                                <a href="img/full/lake_lawn_2018_18.jpg" title="Pre-game stretch!">
                                    <img className="head" src="./img/full/lake_lawn_2018_18.jpg" alt="Lake Lawn 2018 18" />
                                </a>
                                <a href="img/full/lake_lawn_2018_19.jpg" title="Buffet Dinner at Lake Lawn Lodge on Saturday night.">
                                    <img className="head" src="./img/full/lake_lawn_2018_19.jpg" alt="Lake Lawn 2018 19" />
                                </a>
                                <a href="img/full/lake_lawn_2018_20.jpg" title="Jim Kopitke doin' it like a pro ... no shoes.">
                                    <img className="head" src="./img/full/lake_lawn_2018_20.jpg" alt="Lake Lawn 2018 20" />
                                </a>
                                <a href="img/full/lake_lawn_2018_21.jpg" title="(l to r) Nat Derose, Kyle Burritt and Justin Niekamp">
                                    <img className="head" src="./img/full/lake_lawn_2018_21.jpg" alt="Lake Lawn 2018 21" />
                                </a>
                                <a href="img/full/lake_lawn_2018_22.jpg" title="A Como Crossing par 3 hole.  Great view!">
                                    <img className="head" src="./img/full/lake_lawn_2018_22.jpg" alt="Lake Lawn 2018 22" />
                                </a>
                                <a href="img/full/lake_lawn_2018_23.jpg" title="A look over the Como Crossing course and clubhouse.">
                                    <img className="head" src="./img/full/lake_lawn_2018_23.jpg" alt="Lake Lawn 2018 23" />
                                </a>
                                <a href="img/full/lake_lawn_2018_24.jpg" title="Another angle of a Como Crossing par 3 hole.">
                                    <img className="head" src="./img/full/lake_lawn_2018_24.jpg" alt="Lake Lawn 2018 24" />
                                </a>
                                <a href="img/full/lake_lawn_2018_25.jpg" title="Yep! We drove the par 3 course at Hawk's View. Ready to get that Cup!">
                                    <img className="head" src="./img/full/lake_lawn_2018_25.jpg" alt="Lake Lawn 2018 25" />
                                </a>
                                <a href="img/full/lake_lawn_2018_26.jpg" title="The victors of the Cup are finishing up.">
                                    <img className="head" src="./img/full/lake_lawn_2018_26.jpg" alt="Lake Lawn 2018 26" />
                                </a>
                                <a href="img/full/lake_lawn_2018_27.jpg" title="There you have it, 2018 Burritt Cup Winners (l to r) Clint Delee, Dave Kakareka, and Jake Riebe.">
                                    <img className="head" src="./img/full/lake_lawn_2018_27.jpg" alt="Lake Lawn 2018 27" />
                                </a>
                                <a href="img/full/lake_lawn_2018_28.jpg" title="2018 Burritt Cup Winners (l to r) Clint Delee, Dave Kakareka, and Jake Riebe.">
                                    <img className="head" src="./img/full/lake_lawn_2018_28.jpg" alt="Lake Lawn 2018 28" />
                                </a>
                                <a href="img/full/lake_lawn_2018_29.jpg" title="2018 Burritt Cup Winners (l to r) Clint Delee, Dave Kakareka, and Jake Riebe.">
                                    <img className="head" src="./img/full/lake_lawn_2018_29.jpg" alt="Lake Lawn 2018 29" />
                                </a>
                                <a href="img/full/lake_lawn_2018_30.jpg" title="2018 Burritt Cup Winners (l to r) Clint Delee, Dave Kakareka, and Jake Riebe.">
                                    <img className="head" src="./img/full/lake_lawn_2018_30.jpg" alt="Lake Lawn 2018 30" />
                                </a>
                                <a href="img/full/lake_lawn_2018_31.jpg" title="Sean with his Irish Nachos!">
                                    <img className="head" src="./img/full/lake_lawn_2018_31.jpg" alt="Lake Lawn 2018 31" />
                                </a>
                                <a href="img/full/lake_lawn_2018_32.jpg" title="A hole at Abbey Springs.">
                                    <img className="head" src="./img/full/lake_lawn_2018_32.jpg" alt="Lake Lawn 2018 32" />
                                </a>
                                <a href="img/full/lake_lawn_2018_33.jpg" title="(l to r) Nat Derose and Clint Delee">
                                    <img className="head" src="./img/full/lake_lawn_2018_33.jpg" alt="Lake Lawn 2018 33" />
                                </a>
                                <a href="img/full/lake_lawn_2018_34.jpg" title="Most Bogeys winner Jake Riebe">
                                    <img className="head" src="./img/full/lake_lawn_2018_34.jpg" alt="Lake Lawn 2018 34" />
                                </a>
                                <a href="img/full/lake_lawn_2018_35.jpg" title="Most Pars winner Kyle Burritt">
                                    <img className="head" src="./img/full/lake_lawn_2018_35.jpg" alt="Lake Lawn 2018 35" />
                                </a>
                                <a href="img/full/lake_lawn_2018_36.jpg" title="High Round winner Mike Robey">
                                    <img className="head" src="./img/full/lake_lawn_2018_36.jpg" alt="Lake Lawn 2018 36" />
                                </a>
                                <a href="img/full/lake_lawn_2018_37.jpg" title="Low Round winner Kevin Eck">
                                    <img className="head" src="./img/full/lake_lawn_2018_37.jpg" alt="Lake Lawn 2018 37" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row justify-content-center">
                    <div className="col-lg-8 col-md-10">
                        <div className="post-preview">
                            <h2 className="post-title">
                                2019
                    </h2>
                            <h3 className="post-subtitle">
                                TBD <br />
                            </h3>
                            <p className="post-meta">
                                <u>Summary</u> <br />
                            </p>
                            <p className="post-meta">
                                <u>Awards</u>
                                <br />
                            </p>
                            <p className="post-meta">
                                <u>Photo Gallery</u>
                            </p>

                        </div>
                    </div>
                </div>
        </div> */}
    }
}

export default Locations;