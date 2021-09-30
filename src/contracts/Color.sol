// contracts/Color.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Color is ERC721Enumerable {
    // create an array of colors
    // colors(index)
    string[] public colors;
    // create a hash of color that are minted (true/false)
    mapping(string => bool) _colorExists;

    constructor() ERC721("Color", "CLR") {}

    function mint(string memory _color) public {
        // color must be unic
        require(!_colorExists[_color]);
        // assign color's index to color's id
        colors.push(_color);
        uint256 _id = colors.length - 1;
        // call the mint function from Sol
        _mint(msg.sender, _id);
        // Update color minted status
        _colorExists[_color] = true;
    }
}
