import { RfeDocument } from './RfeDocument';
import { expect } from 'chai';
import { Application } from 'xadesjs';

var { Crypto } = require("@peculiar/webcrypto");

Application.setEngine("NodeJS", new Crypto());


describe("WTemplate", function () {


  beforeEach(function () {
  });

  it("should be able to validate a rfe", async function () {
    const fs = require("fs");
    const xmlString = fs.readFileSync(__dirname+"/rfe.xml", "utf8");
    const rfe = new RfeDocument(xmlString);
    const res = await rfe.verify();
    expect(res).equal(true);
  });





  // describe("when song has been paused", function() {
  //   beforeEach(function() {
  //     player.play(song);
  //     player.pause();
  //   });

  //   it("should indicate that the song is currently paused", function() {
  //     expect(player.isPlaying).toBeFalsy();

  //     // demonstrates use of 'not' with a custom matcher
  //     expect(player).not.toBePlaying(song);
  //   });

  //   it("should be possible to resume", function() {
  //     player.resume();
  //     expect(player.isPlaying).toBeTruthy();
  //     expect(player.currentlyPlayingSong).toEqual(song);
  //   });
  // });

  // // demonstrates use of spies to intercept and test method calls
  // it("tells the current song if the user has made it a favorite", function() {
  //   spyOn(song, 'persistFavoriteStatus');

  //   player.play(song);
  //   player.makeFavorite();

  //   expect(song.persistFavoriteStatus).toHaveBeenCalledWith(true);
  // });

  // //demonstrates use of expected exceptions
  // describe("#resume", function() {
  //   it("should throw an exception if song is already playing", function() {
  //     player.play(song);

  //     expect(function() {
  //       player.resume();
  //     }).toThrowError("song is already playing");
  //   });
  // });
});
