/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, ask Roman Facts for a history fact"
 *  Alexa: "Here's your ancient Roman history fact of the day: ..."
 */

/**
 * App ID for the skill
 */
var APP_ID = "amzn1.echo-sdk-ams.app.b4560089-88bf-4e7e-add9-71171363ff70";

/**
 * Array containing Roman history facts.
 */
var FACTS = [
    "The religious title of Pontifex Maximus was assumed by Roman emperors and is still associated with Popes today.",
    "The best known of the seven hills of Rome is the Capitoline, on which the Temple of Jupiter stood.",
    "The name of the Capitoline Hill comes from caput, the Latin word for skull, because a skull was unearthed by the ancient Romans when laying the foundation for the Temple of Jupiter.",
    "The Romans associated their god, Jupiter, with the Greek god Zeus.",
    "The king of the Roman gods was Jupiter, who was a god of the sky and carried a thunderbolt.",
    "The emperor Hadrian built the Temple of Roma and Venus, the largest temple in Rome. The temple's name, Roma, is also a reference to ah mor, spelled backwards, and places the divinities of Rome and Venus back to back in a single temple.",
    "The emperor Hadrian loved all things Greek and started the fashion of beards, after the Greek philosophers.",
    "The Pantheon was the temple to all the gods, and the marbles in the floors were imported from all four corners of the empire.",
    "The dome of the Pantheon is still the world's largest unreinforced concrete dome, and is crowned by an oculus or opening that offers a natural source of light and rain drainage.",
    "The dome of the Pantheon was originally covered in bronze tiles and looked golden.",
    "The Romans learned civil engineering, religion, and culture, from the Etruscans, whose civilization remains a mystery today.",
    "The emperor Claudius was a scholar and wrote a history of the Etruscans and a dictionary of their language, which are both lost today.",
    "The future emperor Claudius was sickly and infirm, and survived the purges of the reigns of Tiberius and Caligula, until the Praetorian Guard made him emperor in 41 C.E. on Caligula's assassination.",
    "After several Roman attempts to conquer the Island of Britain, the emperor Claudius established the province of Britannia in 43 C.E.",
    "King Romulus founded the city of Rome on April 21, 753 B.C., and plowed a furrow around the Palatine Hill to mark the boundary of his new city.",
    "The Roman Empire fell in 476 C.E. when the last Roman emperor, Romulus Augustulus, was deposed.",
    "The Flavian Amphitheater became known as the Colosseum due to the 100 foot bronze statue or colossus of Nero, which stood near it.",
    "The legend of Rome's founding is detailed in the epic poem, The Aeneid, written by the Roman poet Virgil between 29 and 19 B.C.",
    "The size of the imperial Roman army reached a peak of 450,000 soldiers in 211 C.E.",
    "During the Empire, a volunteer Roman legionnaire served a standard term of enlistment of 25 years.",
    "The Battle of Adrianople, fought against the Goths in 378 C.E., was a catastrophic defeat for the Romans who lost two thirds of their seven legions, including their emperor Valens.",
    "The Battle of Actium in 31 B.C. between Octavian and Mark Antony reconfigured the Roman world. The victorious Octavian became the emperor Augustus and established the Empire.",
    "After driving out Tarquin the Proud, the last king of Rome in 509 B.C., the Romans established the Republic and traditionally detested the thought of being ruled by a king.",
    "After the senate declared Julius Caesar Dictator in Perpetuity, he was assassinated by a group of Senators led by Marcus Brutus on March 15, 44 B.C. in the Theater of Pompey.",
    "Cincinnatus was absolute dictator for two weeks in 458 B.C. to defeat a neighboring tribe before humbly giving up his position and returning to farming.",
    "A famously enduring symbol of Rome is the she wolf suckling the twins Romulus and Remus. Imagery and statues of the she wolf are found on Roman coins and throughout Italy.",
    "So-called Vulgar Latin was the common speech and dialects of the populations of the late Roman Empire, and forms the basis for what would later be the Romance Languages.",
    "The Silver Age of Latin Literature lasted from 14 to 117 C.E. and emphasized mannerisms over content, due to tyrannical influences against free speech.",
    "The Golden Age of Latin Literature lasted from 83 B.C. to 14 C.E. and was a period when Latin fully matured as a literary medium.",
    "The Latin alphabet was derived from Greek, Etruscan, and other scripts, and was highly suited for inscriptions in stone on monuments and buildings.",
    "The early wealth of Rome was partly based on its proximity to salt trade routes, and words like salary still reflect the association of salt with money today.",
    "The Romans were fascinated by Egypt, and Augustuses ambitious building program included the costly transportation of a number of ancient Egyptian obelisks by land and sea. These obelisks can still be seen in Rome and other cities today.",
    "For a time, the majority of the goods of the world arrived in Rome via the port of Ostia Antica, which became a thriving city. It was eventually abandoned and buried in silt. Today's excavations have revealed orginal buildings and structures.",
    "The city of Ravenna in Italy became the capital for the Western Roman Empire from 402 to 476 C.E., and later became the seat of Byzantine rule in Italy",
    "The Mausoleum of the western roman empress Galla Placidia, who was daughter, wife, and mother to Roman emperors during the late Empire, in Ravenna, Italy, is a UNESCO world heritage site. However it's unclear whether it really was her final resting place.",
    "Theodosius the Great, who ruled from 379 to 395 C.E. was the last emperor to rule over both the Western and Eastern Roman Empire and banned Pagan rituals throughout the realm.",
    "The short reign of Julian the Apostate, from 360 to 363 C.E., was marked by efforts to revitalize the values of ancient Roman paganism at the expense of Christianity.",
    "The start of Diocletian's reign in 284 C.E. ended the Crisis of the Third Century and started a period of revitalization and reform.",
    "Besides being an emperor, Marcus Aurelius was also a Stoic philosopher and wrote his book Meditations while on campaign during the Marcomannic Wars between 170 to 180 C.E.",
    "The Crisis of the Third Century from 235 to 284 C.E. was characterized by military anarchy and a breakdown of trade, and nearly ended the Roman Empire.",
    "General Gaius Marius, who lived from 157 to 86 B.C., introduced innovations to the Roman army during the late Republic, that enabled their victories and set the stage for the Empire.",
    "The consulship during the Republic was a powerful position but limited to only one year. Two consuls served simultaneously, each with veto power over the other.",
    "The Vestal Virgins guaranteed the safety of Rome by keeping the sacred fire of Vesta burning and taking vows of chastity.",
    "Traditional Roman religion relied on practice of rituals and prayers rather than on faith, and each household had a shrine with their own domestic deities or lars and penates, to which offerings of food and drink were made.",
    "From the point of view of Roman law, Roman households were governed by the oldest living male head of household, or pater familias, who held the power of life and death over every member of the family.",
    "Under Roman law, women enjoyed a greater degree of financial independence than in other ancient societies. They inherited and disposed of property as men did, and could run businesses.",
    "The Code of Justinian, written in Latin during the reign of the Byzantine emperor Justinian the first, forms the foundation of the Western legal tradition.",
    "The Byzantine empress Theodora, who reigned with her husband Justinian the first, played a decisive role in putting down the Nika riots of 532 C.E. in the Hippodrome of Constantinople. When the rioters swarmed in numbers and began burning the city, she stood her ground and pronounced that royal purple is the noblest shroud. This changed the emperors' mind about fleeing, and the government stood firm, thus assuring Justinian's continuing reign.",
    "In 42 C.E. the Senate proclaimed Livia, the wife of the emperor Augustus, to be a goddess, and henceforth her memory would be held sacred. Her statues would be erected throughout the empire, and her image was to be driven around in a chariot drawn by elephants in all public games.",
    "Schoolteacher turned army officer Pertinax was assassinated by his own guard after being proclaimed emperor in 193 C.E., while trying to restore discipline among his troops.",
    "In 312 B.C., the censor Appius Claudius started construction of his namesake road from Rome to the south into Campania. This heralded the dawn of an extensive road network that would enable Roman military and economic domination of the areas it occupied.",
    "The aqueduct Aqua Virgo, which piped water to Rome over a continuous period of 400 years, was said to emerge from a source discovered by a virgin. The terminus of this aqueduct is marked by the Trevi Fountain today.",
    "The Baths of Caracalla, completed in 217 C.E., included not only baths but sports gyms and libraries of Greek and Latin texts. The entire complex could accomodate one thousand six hundred bathers.",
    "Workers building Trajan's Forum in 112 C.E. had to dig through the sides of the Quirinal and Capitoline Hills to make way for the vast complex of 150 shops, where goods from flowers and vegetables to fish in saltwater tanks would be sold.",
    "St. Peter was martyred in the Circus of Nero in 64 C.E. and buried in a cemetary on the nearby Vatican Hill, over which Saint Peter's basilica rises today.",
    "Today, it is thought that gladitorial games originated in Campania and were introduced to Rome in 264 B.C., when three gladiator pairs fought to the death in Rome's cattle market forum."
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * RomanFacts is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var Fact = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
Fact.prototype = Object.create(AlexaSkill.prototype);
Fact.prototype.constructor = Fact;

Fact.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    //console.log("onSessionStarted requestId: " + sessionStartedRequest.requestId + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

Fact.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    //console.log("onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
Fact.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    //console.log("onSessionEnded requestId: " + sessionEndedRequest.requestId + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

Fact.prototype.intentHandlers = {
    "GetNewFactIntent": function (intent, session, response) {
        handleNewFactRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can say tell me a Roman history fact, or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleNewFactRequest(response) {
    // Get a random history fact from the Roman facts list
    var factIndex = Math.floor(Math.random() * FACTS.length);
    var randomFact = FACTS[factIndex];

    // Create speech output
    var speechOutput = "Here's your Roman history fact: " + randomFact;
    var cardTitle = "Your Fact";
    response.tellWithCard(speechOutput, cardTitle, speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the RomanFacts skill.
    var fact = new Fact();
    fact.execute(event, context);
};

