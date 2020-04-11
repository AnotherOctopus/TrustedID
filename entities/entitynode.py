import json

class BlockChain(object):
    def __init__(self,filename = None)
        if filename:
            with open(filename) as fh:
                self.blockchain = json.load(fh)
        else:
            self.blockchain = {"blockchain" : ["InitialBlock"]}

def addblock():

class BlockChainNode(object):
    def __init__(self):
        self.ips = []
        with open("nodes.txt") as fh:
            for line in fh:
                self.ips.append(line)
        self.port = 1917
