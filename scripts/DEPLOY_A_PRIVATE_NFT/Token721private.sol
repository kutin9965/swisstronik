// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Token721private is ERC721 {
    uint256 private _nextTokenId;

   constructor() ERC721("Swisstronik721Private", "SWTR721P") {
        _safeMint(msg.sender, _nextTokenId);
        _nextTokenId++;
    }

    function safeMint(address to) public {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
    }

    function balanceOf(address account) public view override returns (uint256) {
        require(msg.sender == account, "Token721private: msg.sender != account");
        return super.balanceOf(account);
    }

    function getApproved(uint256 tokenId) public view override returns (address) {
        address approvedAddress = super.getApproved(tokenId);
        require(msg.sender == approvedAddress, "Token721private: msg.sender != approvedAddress");
        return approvedAddress;
    }

    function isApprovedForAll(address owner, address operator) public view override returns (bool) {
        bool isApproved = super.isApprovedForAll(owner, operator);
        require(msg.sender == operator, "Token721private: msg.sender != operator");
        return isApproved;
    }

}