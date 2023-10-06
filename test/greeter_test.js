const GreeterContract = artifacts.require('Greeter');

contract('Greeter', (accounts) => {
  describe('deployment', () => {
    it('has been deployed successfully!', async () => {
      const greeter = await GreeterContract.deployed();
      assert(greeter, 'contract was not deployed!');
    });
  });

  describe('greet()', () => {
    it("returns 'Hello World!'", async () => {
      const greeter = await GreeterContract.deployed();
      const actual = await greeter.greet();
      const expected = 'Hello World!';

      assert.equal(actual, expected, "greeted with, 'Hello World!'");
    });

    it('special greeting', async () => {
      const greeter = await GreeterContract.deployed();
      const expected = 'Hey!';
      await greeter.setGreeting(expected);
      const actual = await greeter.greet();

      assert.equal(actual, expected, `Special greeting ${expected} sent`);
    });
  });

  describe('owner', () => {
    it('owner exists', async () => {
      const greeter = await GreeterContract.deployed();
      const owner = await greeter.getOwner();

      assert(owner, 'the current owner');
    });

    it('verify the owner', async () => {
      const greeter = await GreeterContract.deployed();
      const expected = await greeter.getOwner();
      const actual = accounts[0];

      assert.equal(expected, actual, "It's the owner");
    });
  });

  contract('Greeter by owner', (accounts) => {
    describe('greetings from owner', () => {
      it('greeting should not update', async () => {
        const greeter = await GreeterContract.deployed();
        try {
          await greeter.setGreeting('Hey!', { from: accounts[1] });
        } catch (err) {
          const errMessage = 'Ownable: caller is not the owner';
          assert.equal(err.reason, errMessage, 'caller is not the owner');
          return;
        }
        assert(false, 'greeting should not update');
      });
    });
  });
});
